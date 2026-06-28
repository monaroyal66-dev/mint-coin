# 05_DATABASE_MAPPING.md — コインDB ↔ サイト対応表

## 概要

mint プロジェクト（`C:\Users\kyo\Documents\workspace\mint\`）が持つ
SQLite DB のデータを、将来的に MINT COIN サイトへ表示する。

現フェーズ（Phase 1〜2）は静的コンテンツのみ。
Phase 3 以降で Cloudflare D1 + Workers を経由して連携する。

---

## DB テーブルとサイト表示の対応

### Series テーブル

| DB カラム | サイト表示場所 | 表示内容 |
|---|---|---|
| `name` | `/series/{slug}/` H1 | シリーズ名 |
| `issuer` | 概要ボックス | 発行元（造幣局名） |
| `country` | 概要ボックス・フィルタ | 発行国 |
| `metal` | 概要ボックス | 素材（Gold / Silver） |
| `era_start` / `era_end` | 概要ボックス | 発行期間 |
| `denomination_convention` | Variant 一覧 | oz表記 or Face Value表記の切り替え |
| `description`（将来追加） | シリーズ本文 | 解説テキスト |

### Variant テーブル

| DB カラム | サイト表示場所 | 表示内容 |
|---|---|---|
| `id` | URL `/coin/{id}/` | コインID |
| `series_id` | シリーズ詳細ページ内 Variant 一覧 | 親シリーズ |
| `name` | Variant 一覧・個別ページ H1 | Variant 名 |
| `denomination` | Variant 一覧 | 額面・サイズ |
| `weight_g` / `fineness` | 概要ボックス | 重量・品位 |
| `gold_content_g` | 概要ボックス | 純金量 |
| `mint_year`（範囲） | 年号一覧 | 発行年 |

### coin_yahoo（ヤフオク落札データ）

| DB カラム | サイト表示場所 | 表示内容 |
|---|---|---|
| `variant_id` | シリーズ詳細ページ 価格セクション | 対象 Variant |
| `grade` | 価格グレード軸 | MS65, PR70 等 |
| `sold_price` / `median_price` | 価格表・グラフ | 国内相場 |
| `sold_date` | 価格グラフ（横軸） | 時系列 |
| `cnt` | 信頼度表示 | サンプル数 |

### ebay_listings

| DB カラム | サイト表示場所 | 表示内容 |
|---|---|---|
| `variant_id` | 価格セクション | 対象 Variant |
| `title` | eBay 価格カード | 出品タイトル |
| `current_price_jpy` | 価格表 | eBay 現在価格（円換算） |
| `judgment` | BUY/WATCH バッジ | システム判定 |
| `url` | eBay リンク | 出品ページへ |

### Portrait テーブル

| DB カラム | サイト表示場所 | 表示内容 |
|---|---|---|
| `name` | フィルタ・タグ | 肖像名（Victoria, Elizabeth II 等） |
| `variant_ids` | 肖像別ページ `/person/{slug}/` | 該当 Variant 一覧 |

### Certification（NGC/PCGS データ）

| DB カラム | サイト表示場所 | 表示内容 |
|---|---|---|
| `cert_number` | 証明書リンク | NGC/PCGS 検索 URL |
| `grade` | グレード分布グラフ | 鑑定グレード |
| `company` | ラベル表示 | NGC / PCGS |
| `mint_year` | グレード別年号フィルタ | 年号 |

---

## API 設計方針（将来）

Cloudflare Workers で以下のエンドポイントを提供する:

```
GET /api/series                     ← 全シリーズ一覧
GET /api/series/{slug}              ← シリーズ詳細
GET /api/series/{slug}/variants     ← Variant 一覧
GET /api/variant/{id}               ← Variant 詳細
GET /api/variant/{id}/prices        ← 価格データ（ヤフオク + eBay）
GET /api/variant/{id}/grades        ← グレード分布
GET /api/search?q={keyword}         ← 全文検索
```

### レスポンス形式

```json
{
  "series": {
    "id": 1,
    "name": "Una and the Lion",
    "slug": "una-and-the-lion",
    "issuer": "Royal Mint",
    "country": "GB",
    "metal": "gold",
    "era_start": 1839,
    "era_end": null
  },
  "variants": [...],
  "prices": {
    "yahoo_median": 2750000,
    "ebay_median_jpy": 2650000,
    "sample_count": 12
  }
}
```

---

## Phase 別 実装スケジュール

| Phase | 内容 | DB 利用 |
|---|---|---|
| Phase 1（現在） | 静的ページのみ | なし（手書きコンテンツ） |
| Phase 2 | シリーズ詳細ページ（静的） | ビルド時に CSV/JSON から読み込み |
| Phase 3 | D1 + Workers API 連携 | リアルタイム DB 参照 |

### Phase 2 の中間策（静的 JSON）

D1 移行前の暫定手段として、Python スクリプトで SQLite から JSON をエクスポートし
`src/data/series.json` 等に配置。Astro のビルド時に読み込む。

```
mint/scripts/oneshot/export_for_web.py
    ↓ 出力
mint-coin/src/data/series.json
mint-coin/src/data/variants.json
```

Astro側:
```astro
---
import series from '../../data/series.json';
---
```

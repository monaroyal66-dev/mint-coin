# 01_SITE_ARCHITECTURE.md — サイト設計書

## サイト構成（全体マップ）

```
/                           ← トップページ
│
├── /coin-info/             ← コインを知る（基礎知識ハブ）
│       ├── /basics/        ← コインとは・素材・種類（将来）
│       ├── /gold/          ← 金貨ガイド（将来）
│       ├── /silver/        ← 銀貨ガイド（将来）
│       └── /glossary/      ← 用語集（将来）
│
├── /series/                ← シリーズ一覧（SEO最重要）
│       ├── /una-and-the-lion/
│       ├── /three-graces/
│       ├── /sovereign/
│       ├── /britannia/
│       ├── /queens-beasts/
│       ├── /tudor-beasts/
│       └── /{slug}/        ← 動的ルート（将来）
│
├── /grading/               ← グレーディング解説ハブ
│       ├── /ngc/           ← NGC詳細（将来）
│       ├── /pcgs/          ← PCGS詳細（将来）
│       └── /labels/        ← ラベルの読み方（将来）
│
├── /columns/               ← コラム一覧
│       └── /{slug}/        ← 個別コラム（将来）
│
├── /news/                  ← ニュース（将来）
│
├── /company/               ← 会社概要
│
└── /contact/               ← お問い合わせ
```

## URL 設計

### Phase 1（現在）— 静的ページのみ

| URL | 内容 |
|---|---|
| `/` | トップページ |
| `/coin-info/` | コイン情報ハブ |
| `/series/` | シリーズ一覧 |
| `/grading/` | グレーディング解説 |
| `/columns/` | コラム一覧 |
| `/company/` | 会社概要 |
| `/contact/` | お問い合わせ |

### Phase 2（次期）— シリーズ詳細ページ

| URL | 内容 |
|---|---|
| `/series/una-and-the-lion/` | Una and the Lion 詳細 |
| `/series/three-graces/` | Three Graces 詳細 |
| `/series/sovereign/` | Sovereign 詳細 |
| `/series/britannia/` | Britannia 詳細 |
| `/series/queens-beasts/` | Queen's Beasts 詳細 |

### Phase 3（将来）— DB連携ページ

| URL | 内容 |
|---|---|
| `/series/{slug}/` | 全シリーズ動的生成 |
| `/coin/{id}/` | コイン個別ページ |
| `/country/{slug}/` | 発行国別ページ |
| `/person/{slug}/` | 人物（彫刻家・肖像）別ページ |
| `/mint/{slug}/` | 造幣局別ページ |

## ページ別 設計方針

### / トップページ

目的: 初訪問者に MINT COIN のすべてを伝える。
構成（順番厳守）:
1. Hero — キャッチコピー + 2つのCTA
2. 検索バー（将来）
3. 人気シリーズ — カード6〜8枚
4. 最新コラム — 3本
5. コインの基礎知識 — アイコン付き4カテゴリ
6. グレーディング案内
7. 市場情報ティザー（将来）
8. 運営理念
9. お問い合わせCTA

### /series/{slug}/ シリーズ詳細ページ（SEO最重要）

目的: そのシリーズで検索した人が「ここで完結する」ページ。
構成:
1. シリーズ概要（発行元・素材・期間・特徴）
2. 歴史・背景
3. デザイン解説（彫刻家・図柄の意味）
4. Variant一覧（サイズ・グレード別）
5. 年号別 発行枚数
6. 価格情報（NGC・PCGS・eBay・国内）
7. グレード別 相場
8. 鑑定機関 ラベル見本
9. 関連コラム
10. 関連シリーズへのリンク

## DB 連携方針

現在の mint プロジェクトが持つ SQLite DB（auctions.db / coin_yahoo DB）を
将来的に Cloudflare D1 へ移行し、Cloudflare Workers 経由で API 提供する。

```
SQLite（ローカル開発）
    ↓ 移行
Cloudflare D1（本番）
    ↓
Cloudflare Workers（API エンドポイント）
    ↓
Astro（SSG / Hybrid）
    ↓
MINT COIN サイト
```

### 連携するデータ（優先順）

| データ | 用途 |
|---|---|
| Series / Variant | シリーズ・Variant 一覧ページ生成 |
| coin_yahoo（ヤフオク落札） | 国内価格相場の表示 |
| ebay_listings | eBay 価格・BUY/WATCH判定 |
| Portrait | 肖像別フィルタ |
| Grade | グレード分布グラフ |
| Certification（NGC/PCGS） | 鑑定枚数・証明書リンク |

## SEO 優先順位

```
1位: /series/{slug}/     ← 最重要。キーワード直撃。
2位: /coin/{id}/         ← 個別コインで長尾SEO。
3位: /grading/           ← 「NGC MS70」「PCGS PR70」等の検索。
4位: /coin-info/         ← 「アンティークコイン 基礎」系。
5位: /columns/{slug}/    ← 記事SEO。
```

記事（コラム）よりシリーズ・コインページを優先して育てる。

## 狙うキーワード（初期）

- アンティークコイン
- モダンコイン
- Una and the Lion
- Three Graces
- ゴシッククラウン
- Sovereign（ソブリン）
- Britannia（ブリタニア）
- Queen's Beasts
- Tudor Beasts
- NGC MS70 / PCGS PR70
- Royal Mint
- eBay コイン

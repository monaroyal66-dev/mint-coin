# 07_ROADMAP.md — 開発ロードマップ

## 全体像

```
Phase 1: 情報サイト（静的）    ← 現在
Phase 2: シリーズ詳細（静的）  ← 次
Phase 3: DB連携・価格表示
Phase 4: 検索・相場グラフ
Phase 5: コンサル・販売
```

---

## Phase 1 — 情報サイト（現在）

**目標**: MINT COIN の基盤を作る。7ページの静的サイトを公開する。

### 完了済み ✅

- [x] Astro + Tailwind CSS + TypeScript セットアップ
- [x] Cloudflare Pages デプロイ構成
- [x] BaseLayout（SEO/OGP）
- [x] Header / Footer コンポーネント
- [x] トップページ（ヒーロー・カテゴリ・注目テーマ・理念）
- [x] `/coin-info/` 基礎知識ページ
- [x] `/series/` シリーズ一覧ページ
- [x] `/grading/` グレーディング解説ページ
- [x] `/columns/` コラム一覧ページ
- [x] `/company/` 会社概要ページ
- [x] `/contact/` お問い合わせページ

### 残タスク

- [ ] GitHub リポジトリ作成・連携
- [ ] Cloudflare Pages 本番公開（ドメイン mint-coin.jp 設定）
- [ ] OGP 画像（`/public/og-default.png`）作成
- [ ] favicon 差し替え（MINT COIN ブランド版）
- [ ] Google Search Console 登録
- [ ] sitemap.xml 生成（`@astrojs/sitemap` 導入）

---

## Phase 2 — シリーズ詳細ページ（静的コンテンツ）

**目標**: SEO の中核となるシリーズ詳細ページを作る。「Una and the Lion 日本語解説」で日本一を目指す。

**期間目安**: Phase 1 公開後、2〜4 週間

### タスク

#### サイト機能
- [ ] `/series/{slug}/` 動的ルート実装（`getStaticPaths`）
- [ ] `src/data/series.json` — シリーズデータ（手書き→後にエクスポート）
- [ ] シリーズ詳細ページ テンプレート実装
  - 概要ボックス
  - 歴史・背景セクション
  - Variant 一覧テーブル
  - 関連シリーズカード

#### コンテンツ（優先順）
- [ ] Una and the Lion 詳細ページ
- [ ] Three Graces 詳細ページ
- [ ] Sovereign 詳細ページ
- [ ] Britannia 詳細ページ
- [ ] Gothic Crown 詳細ページ
- [ ] Queen's Beasts 詳細ページ
- [ ] Tudor Beasts 詳細ページ

#### SEO
- [ ] `@astrojs/sitemap` でサイトマップ自動生成
- [ ] シリーズページの構造化データ（JSON-LD）追加
- [ ] OGP 画像をシリーズ別に生成

---

## Phase 3 — DB 連携・価格表示

**目標**: mint プロジェクトの DB データを MINT COIN サイトに表示する。

**期間目安**: Phase 2 完了後、1〜2 ヶ月

### タスク

#### インフラ
- [ ] SQLite → Cloudflare D1 移行スクリプト作成
- [ ] Cloudflare Workers API エンドポイント実装（`/api/series`, `/api/variant/{id}/prices` 等）
- [ ] Astro を `output: 'hybrid'` または API ルートで対応

#### データ表示
- [ ] Variant 一覧（DB 連携）
- [ ] グレード別価格テーブル（ヤフオク・eBay）
- [ ] 価格推移グラフ（簡易版、Chart.js または Recharts）
- [ ] NGC/PCGS 鑑定枚数表示
- [ ] eBay 現在出品リスト（BUY/WATCH 判定付き）

---

## Phase 4 — 検索・相場グラフ・高度な分析

**目標**: MINT COIN を「データで選べるコインサイト」にする。

### タスク

- [ ] サイト内コイン検索（シリーズ・国・素材・年号・グレードで絞り込み）
- [ ] 価格推移グラフ（時系列、複数グレード比較）
- [ ] eBay vs 国内価格差の可視化
- [ ] `/country/{slug}/` — 発行国別ページ
- [ ] `/person/{slug}/` — 彫刻家・肖像別ページ
- [ ] `/mint/{slug}/` — 造幣局別ページ
- [ ] ニュース機能（`/news/`）

---

## Phase 5 — コンサル・販売事業化

**目標**: 情報の信頼を基盤に、ミント合同会社の事業収益を作る。

### タスク

- [ ] 無料相談フォーム（Cloudflare Forms または外部サービス）
- [ ] コンサルティングサービスページ
- [ ] NGC 提出サポートサービスページ
- [ ] 代理購入サービスページ
- [ ] 販売ページ（将来）
- [ ] 会員機能・メールマガジン（将来）

---

## 技術移行タイムライン

```
現在
  Astro SSG + Tailwind + Cloudflare Pages
  ↓ Phase 3
  Cloudflare D1（SQLite 移行）
  Cloudflare Workers（API）
  ↓ Phase 4
  Astro hybrid output（一部 SSR 化）
  Cloudflare R2（画像）
  ↓ Phase 5
  Cloudflare KV（キャッシュ）
  会員基盤（将来検討）
```

---

## KPI 目標（ユーノ案）

| フェーズ | 指標 | 目標 |
|---|---|---|
| Phase 1 完了後 | Google Search Console 登録・インデックス | 全ページインデックス済み |
| Phase 2 完了後 | 「Una and the Lion」検索順位 | 日本語 Google 上位10位 |
| Phase 3 完了後 | 月間 PV | 1,000 PV/月 |
| Phase 4 完了後 | 月間 PV | 5,000 PV/月 |
| Phase 5 | 問い合わせ | 月1件以上 |

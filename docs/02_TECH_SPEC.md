# 02_TECH_SPEC.md — 技術仕様書

## 技術スタック

| レイヤー | 技術 | バージョン | 備考 |
|---|---|---|---|
| フレームワーク | Astro | 7.x | SSG 静的出力 |
| スタイリング | Tailwind CSS | 4.x | @tailwindcss/vite |
| 言語 | TypeScript | strict | tsconfig: astro/tsconfigs/strict |
| ホスティング | Cloudflare Pages | — | main ブランチ自動デプロイ |
| バージョン管理 | Git / GitHub | — | main, develop, feature/* |
| パッケージマネージャ | npm | — | package-lock.json を維持 |

## 将来追加予定

| 技術 | 用途 | 時期 |
|---|---|---|
| Cloudflare D1 | コイン DB（SQLite → D1 移行） | Phase 3 |
| Cloudflare Workers | API エンドポイント | Phase 3 |
| Cloudflare R2 | 画像ストレージ | Phase 3 |
| Cloudflare KV | キャッシュ・セッション | Phase 3 |

## ディレクトリ構成

```
mint-coin/
├── docs/                   ← 仕様書（このフォルダ）
├── public/                 ← 静的ファイル（favicon, OGP画像等）
├── src/
│   ├── components/         ← 再利用UIパーツ
│   │     ├── Header.astro
│   │     ├── Footer.astro
│   │     └── ...
│   ├── layouts/            ← ページテンプレート
│   │     ├── BaseLayout.astro   ← HTML/SEO/OGPヘッダー
│   │     └── PageLayout.astro   ← Header + Footer ラッパー
│   ├── pages/              ← URLルーティング（ファイル = URL）
│   │     ├── index.astro
│   │     ├── coin-info/
│   │     ├── series/
│   │     ├── grading/
│   │     ├── columns/
│   │     ├── company/
│   │     └── contact/
│   └── styles/
│         └── global.css    ← Tailwind + @theme カスタムトークン
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── wrangler.jsonc          ← Cloudflare Pages 設定
```

## Astro 設定方針

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'static',         // SSG 固定。SSR は使わない（Phase 3 まで）
  site: 'https://mint-coin.jp',
});
```

## Tailwind v4 カスタムトークン

`src/styles/global.css` の `@theme` ブロックで一元管理:

```css
@theme {
  --color-navy-800: #152a52;  /* メインカラー */
  --color-gold-500: #b8860b;  /* アクセント */
  --color-ivory:    #fafaf7;  /* 背景サーフェス */
  --color-parchment: #e8e2d6; /* ボーダー・区切り */
  --font-serif: 'Noto Serif JP', ...;
  --font-sans:  'Hiragino Kaku Gothic ProN', ...;
}
```

色・フォントは必ず `@theme` で定義し、直接 hex を Tailwind クラスに書かない。

## レイアウト設計

### BaseLayout.astro（SEO 担当）
- `<html lang="ja">`
- `<title>`, `<meta name="description">`, `<link rel="canonical">`
- OGP (`og:title`, `og:description`, `og:image`, `og:url`)
- Twitter Card
- Google Fonts（Noto Serif JP）

### PageLayout.astro（構造担当）
- BaseLayout を拡張
- `<Header />` + `<main>` + `<Footer />` を共通配置
- 各ページは PageLayout だけを import すれば完結する

## ビルド・デプロイフロー

```
ローカル開発
  npm run dev          → http://localhost:4321

ビルド確認
  npm run build        → dist/ に静的ファイル生成

Cloudflare Pages デプロイ
  git push origin main → 自動ビルド & デプロイ（設定後）
  または
  npm run deploy       → wrangler pages deploy dist
```

## 環境変数

現フェーズは不要。将来 DB 連携時:

| 変数名 | 用途 |
|---|---|
| `DATABASE_URL` | Cloudflare D1 接続 |
| `API_SECRET` | Workers API 認証（必要なら） |

## Node.js バージョン

`>=22.12.0`（package.json `engines` フィールドで指定済み）

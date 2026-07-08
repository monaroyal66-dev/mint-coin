# 02_TECH_SPEC.md — 技術仕様書

## 技術スタック

| レイヤー | 技術 | バージョン | 備考 |
|---|---|---|---|
| フレームワーク | Astro | 7.x | `@astrojs/cloudflare` adapter、`output: 'server'`（2026-06にPages/SSGから移行） |
| スタイリング | Tailwind CSS | 4.x | @tailwindcss/vite |
| 言語 | TypeScript | strict | tsconfig: astro/tsconfigs/strict |
| ホスティング | Cloudflare Workers | — | `wrangler deploy`（`@astrojs/cloudflare` adapterが自動検出。`wrangler.jsonc`は誤検出防止のため意図的に未配置） |
| バージョン管理 | Git / GitHub | — | main, develop, feature/*（`origin` = github.com/monaroyal66-dev/mint-coin、リポジトリ作成・連携済み） |
| パッケージマネージャ | npm | — | package-lock.json を維持 |

> **2026-07-08 追記**: `output: 'static'` + Cloudflare Pages 前提だった当初設計から、
> `@astrojs/cloudflare` adapter導入により Cloudflare Workers（`output: 'server'`）へ
> 移行済み。Phase 3 で予定していたAPI基盤（Workers）を前倒しでホスティング層に採用した形。
> DB連携（D1・実際のAPIエンドポイント実装）自体はまだ未着手で、現状は全ページ静的相当の
> レンダリングのみ行っている。`06_DEVELOPMENT_RULES.md`の禁止事項もあわせて確認すること。

## 将来追加予定

| 技術 | 用途 | 時期 |
|---|---|---|
| Cloudflare D1 | コイン DB（SQLite → D1 移行） | Phase 3 |
| Cloudflare Workers API（`/api/*`実装） | データ連携エンドポイント | Phase 3（ホスティング自体は導入済み、APIは未実装） |
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
└── tsconfig.json
    （wrangler.jsonc は意図的に未配置。@astrojs/cloudflare adapterのbuild出力
     dist/server/wrangler.json をdeploy時に参照する）
```

## Astro 設定方針

```javascript
// astro.config.mjs（現行、2026-07-08時点）
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
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
  npm run build        → dist/ に Worker + 静的アセット生成

デプロイ（オーナー指示があるまで実行しない）
  npm run deploy       → build後 wrangler deploy --config dist/server/wrangler.json
```

## 環境変数

現フェーズは不要。将来 DB 連携時:

| 変数名 | 用途 |
|---|---|
| `DATABASE_URL` | Cloudflare D1 接続 |
| `API_SECRET` | Workers API 認証（必要なら） |

## Node.js バージョン

`>=22.12.0`（package.json `engines` フィールドで指定済み）

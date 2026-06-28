# CLAUDE.md — MINT COIN プロジェクト指示書

## Development

開発サーバーはバックグラウンドで起動する:

```sh
npx astro dev stop 2>/dev/null; npm run dev &
```

ビルド確認（作業完了前に必ず実行）:

```sh
npm run build
```

## MINT COIN AI Instructions

作業前に `docs/` の仕様書を読むこと。優先順位:

1. `docs/00_PROJECT_VISION.md` — プロジェクト目的・理念・ビジョン
2. `docs/01_SITE_ARCHITECTURE.md` — サイト設計・URL設計・DB連携方針
3. `docs/02_TECH_SPEC.md` — 技術スタック・環境・ディレクトリ構成
4. `docs/03_UI_DESIGN.md` — デザインシステム・カラー・タイポグラフィ
5. `docs/04_CONTENT_GUIDE.md` — コンテンツ方針・SEO・記事の書き方
6. `docs/05_DATABASE_MAPPING.md` — コインDB構造・APIとの対応
7. `docs/06_DEVELOPMENT_RULES.md` — 開発ルール・Git・命名規則
8. `docs/07_ROADMAP.md` — フェーズ計画・将来機能

## Rules

- サイトのコンセプト・理念は承認なしに変更しない
- デザインシステム（カラー・フォント・余白）は承認なしに変更しない
- 静的サイト（Cloudflare Pages）を前提とし、SSR は原則使わない
- `npm run build` がエラーゼロであることを確認してから完了とする
- GitHub への push はオーナーから明示的に指示があるまで行わない
- 仕様書 → 実装 の順で進める。仕様にないことは勝手に実装しない

## Astro Documentation

- [ルーティング](https://docs.astro.build/en/guides/routing/)
- [Astro コンポーネント](https://docs.astro.build/en/basics/astro-components/)
- [コンテンツコレクション](https://docs.astro.build/en/guides/content-collections/)
- [Tailwind の使い方](https://docs.astro.build/en/guides/styling/)

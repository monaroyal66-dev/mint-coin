# 06_DEVELOPMENT_RULES.md — 開発ルール（Claude Code 向け）

## 鉄則

1. **仕様書 → 実装** の順で進める。`docs/` を読まずに実装しない。
2. **`npm run build` エラーゼロ** を確認してから完了と報告する。
3. **デザインシステムを勝手に変えない**（`03_UI_DESIGN.md` 参照）。
4. **GitHub push はオーナー指示があるまで行わない**。
5. **仕様にない機能を勝手に追加しない**。

---

## Git 運用

### ブランチ構成

```
main        ← 本番（Cloudflare Pages が自動デプロイ）
develop     ← 開発統合ブランチ
feature/*   ← 機能別ブランチ（例: feature/series-detail-page）
```

### コミットメッセージ規則

```
feat:     新機能追加
fix:      バグ修正
style:    見た目の修正（機能変更なし）
docs:     ドキュメント変更
refactor: リファクタリング
chore:    設定・パッケージ変更
```

例:
```
feat: add Una and the Lion series detail page
fix: correct active nav link detection for sub-paths
docs: update 01_SITE_ARCHITECTURE.md with Phase 2 URL plan
```

### やってはいけないこと

- `git push --force`（main への force push は禁止）
- `git commit -m "fix"` など意味のないコミットメッセージ
- `node_modules/` や `dist/` をコミット（.gitignore で除外済み）
- `.env` ファイルをコミット

---

## GitHub Push 前チェックリスト

push する前に以下を全て確認する。1項目でも NG なら push しない。

### 1. .gitignore の確認

- [ ] `node_modules/` が追跡されていない（`git ls-files node_modules` が空）
- [ ] `dist/` が追跡されていない
- [ ] `.astro/` が追跡されていない
- [ ] `.vscode/` が追跡されていない
- [ ] `.wrangler/` が追跡されていない
- [ ] `.env*` が追跡されていない
- [ ] `git status` が `nothing to commit, working tree clean`

### 2. ビルド確認

- [ ] `npm run build` がエラーゼロで完了する
- [ ] `npx astro check` で TypeScript エラーがない
- [ ] ビルド後の `dist/` に全ページの HTML が生成されている

### 3. README.md の内容

- [ ] プロジェクト名・概要が記載されている
- [ ] 起動方法（`npm install` / `npm run dev`）が記載されている
- [ ] ビルド・デプロイ方法が記載されている
- [ ] 技術スタックが記載されている

### 4. docs が揃っていること

- [ ] `docs/00_PROJECT_VISION.md` が存在し、空でない
- [ ] `docs/01_SITE_ARCHITECTURE.md` が存在し、空でない
- [ ] `docs/02_TECH_SPEC.md` が存在し、空でない
- [ ] `docs/03_UI_DESIGN.md` が存在し、空でない
- [ ] `docs/04_CONTENT_GUIDE.md` が存在し、空でない
- [ ] `docs/05_DATABASE_MAPPING.md` が存在し、空でない
- [ ] `docs/06_DEVELOPMENT_RULES.md` が存在し、空でない
- [ ] `docs/07_ROADMAP.md` が存在し、空でない

### 5. ライセンスの有無

- [ ] `LICENSE` ファイルが存在する（またはリポジトリを Private にすることを確認済み）
- [ ] `package.json` の `"license"` フィールドを確認した

> **現状メモ**: リポジトリが Private であれば LICENSE は必須ではない。
> Public にする場合は MIT または All Rights Reserved を明記すること。

### 6. Cloudflare Pages の設定確認

- [ ] Cloudflare Pages プロジェクトが作成済み
- [ ] ビルドコマンド: `npm run build`
- [ ] 出力ディレクトリ: `dist`
- [ ] Node.js バージョン: `22`（Environment Variables で `NODE_VERSION=22` を設定）
- [ ] カスタムドメイン `mint-coin.jp` の DNS 設定が完了している（または設定予定を確認）
- [ ] main ブランチへの push で自動デプロイが動くことを確認

---

## ファイル命名規則

### ページ（`src/pages/`）

- ディレクトリ + `index.astro` を基本とする
- URL スラッグはケバブケース: `una-and-the-lion/index.astro`

### コンポーネント（`src/components/`）

- パスカルケース: `SeriesCard.astro`, `PageHero.astro`
- 汎用コンポーネントは単独ファイル
- 特定ページ専用コンポーネントはサブフォルダ可（`components/series/SeriesVariantTable.astro`）

### スタイル

- カスタムクラスは `global.css` に集約
- コンポーネント固有スタイルは `<style>` タグ内に書く（Tailwind が対応できない場合のみ）

---

## 実装チェックリスト

作業完了前に必ず確認:

- [ ] `npm run build` がエラーゼロで完了する
- [ ] `npx astro check` で TypeScript エラーがない
- [ ] ブラウザで対象ページの表示を確認した
- [ ] モバイル幅（375px）で崩れがない
- [ ] `title` と `description` が正しく設定されている
- [ ] canonical URL が正しい
- [ ] 内部リンクが正しく機能する
- [ ] `docs/03_UI_DESIGN.md` のデザインルールに違反していない

---

## TypeScript ルール

- `strict` モードを維持する（`tsconfig.json` を変えない）
- Astro frontmatter の `Props` は必ず `interface Props` で型定義する
- `any` を使わない（使う場合はコメントで理由を書く）

---

## パフォーマンス方針

- 画像: `public/` に配置し、将来的に Cloudflare R2 へ移行
- Google Fonts: `preconnect` を使って遅延を最小化（BaseLayout.astro 実装済み）
- JavaScript: 最小限に留める（Astro のアイランドアーキテクチャを活用）
- サードパーティスクリプト: 原則追加しない（アナリティクスは将来検討）

---

## 禁止事項まとめ

| 禁止 | 理由 |
|---|---|
| デザインカラーの独断変更 | ブランド統一のため |
| `output: 'server'` への変更 | 静的サイト前提のため |
| npm push to GitHub 未指示 | オーナー管理のため |
| `npm audit fix --force` の実行 | 破壊的変更リスクのため |
| 仕様書にない機能追加 | スコープ管理のため |
| コメントアウトされたコードのコミット | コードベースの清潔さのため |

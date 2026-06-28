# mint-coin

アンティークコインの専門サイト。Astro + Tailwind CSS + TypeScript で構築、Cloudflare Pages にデプロイ。

## 技術スタック

- [Astro](https://astro.build/) — 静的サイトジェネレーター
- [Tailwind CSS v4](https://tailwindcss.com/) — スタイリング
- TypeScript (strict)
- [Cloudflare Pages](https://pages.cloudflare.com/) — ホスティング

## フォルダ構成

```
src/
├── components/   # 再利用可能なコンポーネント (Header, Footer など)
├── layouts/      # ページレイアウト (BaseLayout など)
├── pages/        # ルーティング対象ページ (.astro ファイルがURLになる)
└── styles/       # グローバルスタイル
public/           # 静的アセット (favicon, 画像など)
```

## 起動方法

```sh
# 依存パッケージのインストール（初回のみ）
npm install

# 開発サーバー起動 → http://localhost:4321
npm run dev

# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## デプロイ

Cloudflare Pages に接続し、以下の設定でデプロイ：

| 項目 | 値 |
|---|---|
| ビルドコマンド | `npm run build` |
| 出力ディレクトリ | `dist` |
| Node.js バージョン | 22 以上 |

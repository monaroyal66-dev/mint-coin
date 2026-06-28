# 03_UI_DESIGN.md — デザインシステム

## デザインコンセプト

**「博物館」**

参考イメージ:
- British Museum（権威・信頼・余白）
- Royal Mint（royalmint.com）（格調・上品）
- NGC（ngccoin.com）（データ・専門性）

「ショップ」でも「投資サイト」でもなく、**情報を展示する場所**としてデザインする。

---

## ブランドカラー

### Primary Palette

| 名前 | Hex | Tailwind クラス | 用途 |
|---|---|---|---|
| Navy | `#152A52` | `navy-800` | ヘッダー・見出し・CTAボタン |
| Navy Dark | `#0D1C38` | `navy-900` | フッター背景・ホバー色 |
| Gold | `#B8860B` | `gold-500` | 区切り線・アクセント・ラベル |
| Gold Light | `#D4A317` | `gold-400` | ホバー時の Gold |

### Surface / Neutral

| 名前 | Hex | Tailwind クラス | 用途 |
|---|---|---|---|
| White | `#FFFFFF` | `white` | メイン背景 |
| Ivory | `#FAFAF7` | `ivory` | セクション背景（白と交互に使う） |
| Parchment | `#E8E2D6` | `parchment` | ボーダー・区切り線 |
| Text Primary | `#1A1A1A` | `gray-900` | 本文 |
| Text Muted | `#6B7280` | `gray-500` | サブテキスト・キャプション |

### 禁止事項

- これら以外のカラーを新たに使わない
- `bg-blue-*`, `bg-red-*` 等のデフォルト Tailwind カラーは原則使わない
- 明度の低いカラーを背景に使わない（フッター例外）

---

## タイポグラフィ

### フォント

| 用途 | フォント | クラス |
|---|---|---|
| 見出し（H1〜H3） | Noto Serif JP | `font-serif` |
| 本文・UI | Hiragino Kaku Gothic ProN → Noto Sans JP | `font-sans` |
| 英語ロゴ・装飾 | Noto Serif JP（同上） | `font-serif` |

### サイズスケール（Tailwind）

| 用途 | クラス | サイズ |
|---|---|---|
| ページタイトル（H1） | `text-3xl sm:text-4xl` | 30〜36px |
| ヒーロー見出し | `text-3xl sm:text-4xl lg:text-5xl` | 30〜48px |
| セクション見出し（H2） | `text-2xl` | 24px |
| カード見出し（H3） | `text-lg` または `text-xl` | 18〜20px |
| 本文 | `text-sm` または `text-base` | 14〜16px |
| キャプション・ラベル | `text-xs` | 12px |

### 行間

- 日本語本文: `leading-loose`（2.0）
- 見出し: `leading-snug`（1.375）
- 英語ラベル・略語: `tracking-wide` または `tracking-widest`

---

## スペーシング

### セクション間

| レイアウト | 上下パディング |
|---|---|
| フルページセクション | `py-16` 〜 `py-24` |
| ヒーロー | `py-24 sm:py-32` |
| サブページ ページヘッダー | `py-12` |
| フッター | `pt-14 pb-8` |

### コンテンツ幅

| 用途 | クラス |
|---|---|
| 全体のmax幅 | `max-w-7xl mx-auto` |
| 読み物・長文コンテンツ | `max-w-3xl mx-auto` |
| ヒーロー・短いテキスト | `max-w-2xl mx-auto` |
| 横パディング | `px-4 sm:px-6 lg:px-8` |

---

## コンポーネント設計

### Header

- 白背景・下ボーダー（parchment）・`sticky top-0 z-50`
- 最上部に Gold のアクセントバー（`h-0.5 bg-gold-500`）
- ロゴ: `font-serif tracking-[0.18em]`、Navy 900
- ナビ: アクティブページは Gold 下線付き
- モバイル: ハンバーガーメニュー（最小限 JS）

### Footer

- Navy 900 背景
- 3カラム: Brand / Navigation / Contact
- ナビリンク: `text-navy-300 hover:text-white`
- セクションラベル: `text-xs tracking-widest text-gold-400 uppercase`

### セクション見出し（統一パターン）

```html
<h2 class="font-serif text-2xl font-semibold text-navy-900 mb-3">見出し</h2>
<div class="w-8 h-px bg-gold-500 [mb-10]"></div>
```

Gold の横線を見出しの直下に置く。中央揃えと左揃えどちらも可。

### カード

```
border border-parchment rounded
hover:border-navy-200 hover:shadow-sm
transition-all
```

カード内のリンクアロー: `text-gold-600 group-hover:text-gold-500`

### ボタン

**Primary（Navy）:**
```
bg-navy-800 text-white px-8 py-3 text-sm font-medium tracking-wide rounded
hover:bg-navy-900 transition-colors
```

**Secondary（Outlined）:**
```
border border-navy-700 text-navy-800 px-8 py-3 text-sm font-medium tracking-wide rounded
hover:bg-navy-50 transition-colors
```

### タグ / ピル

```
border border-navy-200 text-navy-700 px-5 py-2 text-sm rounded-full
hover:border-navy-600 hover:text-navy-900 hover:bg-white transition-all
```

### パンくずナビ

```html
<nav class="text-xs text-gray-400">
  <a href="/" class="hover:text-navy-700">ホーム</a>
  <span class="mx-2">›</span>
  <span class="text-gray-600">現在のページ</span>
</nav>
```

### ページヒーロー（サブページ共通）

```
bg-ivory py-12 border-b border-parchment
```
内容: パンくず → H1（navy-900）→ 説明文（gray-600）

---

## セクション背景の交互ルール

同じページ内でセクションが続く場合、背景を交互にする:

```
white → ivory → white → ivory ...
```

コントラストで視覚的なリズムを作る。隣接する同色セクションは避ける。

---

## 禁止事項

- アニメーションの多用（`transition` は `colors` または `all` のみ、`duration-150〜300` まで）
- グラデーション背景（`bg-gradient-*`）は原則禁止（Gold ラインの極細のみ許可）
- 影の多用（`shadow-sm` のみ許可）
- 赤・オレンジ・明るい青など、ブランドカラー外の色
- テキストに `font-bold` を多用（`font-semibold` を基準とする）

# Salon de Beauté - 美容室/サロンウェブサイト

## プロジェクト概要
- **名前**: Salon de Beauté
- **目的**: 美容室・ネイルサロン向けの魅力的なウェブサイト
- **主な機能**: 
  - モダンなヒーローセクション
  - サービス紹介
  - メニュー・料金表
  - ギャラリー
  - お問い合わせフォーム
  - レスポンシブデザイン

## URL
- **開発環境**: https://3000-ivt7oay2mi137p2xfp3h7-2b54fc91.sandbox.novita.ai
- **本番環境**: (Cloudflare Pagesへデプロイ後に追加)

## 実装済み機能

✅ **完成している機能**
1. **ナビゲーション**: 固定ヘッダーナビゲーション、スムーススクロール
2. **ヒーローセクション**: 実写背景画像、大きなタイトル、CTAボタン
3. **Aboutセクション**: サロンの特徴と説明文
4. **サービスセクション**: 
   - ヘアカット（カット ¥4,500、カット + ブロー ¥5,500）
   - カラーリング（フルカラー ¥8,800、ハイライト ¥12,000）
   - トリートメント（ベーシック ¥3,300、プレミアム ¥6,600）
   - 各サービスに実写画像を配置
5. **ギャラリーセクション**: **microCMS連携で動的に管理**
   - 管理画面から画像の追加・削除が可能
   - SSR（サーバーサイドレンダリング）で高速表示
   - 5分間のキャッシュで最適化
6. **予約フォーム**: 名前、メール、電話、希望日時、メニュー選択
7. **店舗情報**: 住所、電話番号、営業時間
8. **フッター**: ナビゲーションリンク

## 機能エンドポイント
- `GET /` - メインページ（すべてのセクションを含む）
- `POST /api/reservation` - 予約フォーム送信
  - パラメータ: `name`, `email`, `phone`, `date`, `time`, `menu`
  - レスポンス: `{ success: true, message: "..." }`
- `GET /api/gallery` - microCMSからギャラリー画像を取得
  - レスポンス: `[{ id, title, image: { url }, category?, description? }]`

## microCMS連携機能

✅ **動的ギャラリー管理**
- **microCMSサービスドメイン**: `vuvep5iki2`
- **API名**: `gallery`
- **APIの型**: リスト形式
- **フィールド構成**:
  - `title` (テキスト): 画像タイトル
  - `image` (画像): 施術写真
  - `category` (テキスト・任意): カテゴリ
  - `description` (テキストエリア・任意): 説明文

### microCMSでコンテンツを追加する手順
1. microCMS管理画面にログイン: https://vuvep5iki2.microcms.io
2. 「ギャラリー」APIを選択
3. 「コンテンツ作成」をクリック
4. 画像をアップロードし、タイトルを入力
5. 「公開」をクリック
6. 5分以内にサイトに自動反映されます

### 環境変数設定
**ローカル開発** (`.dev.vars`):
```bash
MICROCMS_SERVICE_DOMAIN=vuvep5iki2
MICROCMS_API_KEY=your-api-key
```

**本番環境** (Cloudflare Secrets):
```bash
npx wrangler secret put MICROCMS_API_KEY
# プロンプトでAPIキーを入力
```

## 未実装機能

🔄 **今後追加予定**
1. モバイルメニュー（ハンバーガーメニュー）
2. Cloudflare D1データベース統合（予約データ保存）
3. メール送信機能（予約確認通知）
4. スタッフ紹介セクション（microCMS連携）
5. ブログ機能（microCMS連携）

## データアーキテクチャ
- **データモデル**: 
  - 予約フォーム（name, email, phone, date, time, menu）
  - ギャラリー（microCMS: title, image, category, description）
- **ストレージサービス**: 
  - ギャラリー画像: microCMS（Headless CMS）
  - 予約データ: メモリ（今後Cloudflare D1に移行予定）
- **データフロー**: 
  - ギャラリー: microCMS API → SSRキャッシュ（5分） → 表示
  - 予約: フォーム送信 → API → コンソールログ（今後D1/Email送信に変更）

## 推奨される次のステップ
1. **microCMSにコンテンツ追加**: ギャラリーに施術写真を登録
2. **データベース統合**: Cloudflare D1を使って予約データを永続化
3. **メール機能**: SendGridやResend APIでメール通知を実装
4. **スタッフ紹介**: microCMSで管理するスタッフセクションの追加
5. **SEO最適化**: メタタグ、構造化データの追加
6. **本番デプロイ**: Cloudflare Pagesへのデプロイ

## 利用方法

### ローカル開発
```bash
# 依存関係のインストール
npm install

# ビルド
npm run build

# 開発サーバー起動（PM2使用）
pm2 start ecosystem.config.cjs

# サーバー確認
curl http://localhost:3000

# ログ確認
pm2 logs webapp --nostream
```

### 本番デプロイ
```bash
# Cloudflare Pagesにデプロイ
npm run deploy
```

### 型生成
```bash
# Cloudflare Workers設定に基づいた型の生成
npm run cf-typegen
```

## 技術スタック
- **フレームワーク**: Hono (Cloudflare Workers)
- **スタイリング**: TailwindCSS (CDN)
- **アイコン**: Font Awesome 6
- **CMS**: microCMS (Headless CMS)
- **デプロイ**: Cloudflare Pages
- **ビルドツール**: Vite
- **プロセス管理**: PM2

## デプロイ状況
- **プラットフォーム**: Cloudflare Pages (準備済み)
- **ステータス**: ✅ ローカル開発環境で動作中
- **最終更新**: 2026-01-26

## プロジェクト構造
```
webapp/
├── src/
│   ├── index.tsx          # メインアプリケーション（Hono + JSX）
│   └── renderer.tsx       # HTMLレンダラー
├── public/
│   └── static/
│       ├── hero-salon.jpg      # ヒーロー背景画像
│       ├── hair-cut-image.jpg  # カットサービス画像
│       ├── hair-color-image.jpg # カラーサービス画像
│       ├── hair-treatment-image.jpg # トリートメント画像
│       ├── gallery-1.jpg       # ギャラリー画像1（フォールバック）
│       ├── gallery-2.jpg       # ギャラリー画像2（フォールバック）
│       ├── gallery-3.jpg       # ギャラリー画像3（フォールバック）
│       └── style.css           # カスタムCSS
├── dist/                  # ビルド出力
├── .dev.vars              # ローカル環境変数（microCMS APIキー）
├── ecosystem.config.cjs   # PM2設定
├── wrangler.jsonc         # Cloudflare設定
├── vite.config.ts         # Vite設定
└── package.json           # 依存関係
```

## ライセンス
MIT License

---

💡 **開発者へのメモ**: 
- このプロジェクトはCloudflare Pagesでの本番運用を想定して構築されています
- microCMSでギャラリー画像を管理画面から簡単に追加・削除できます
- D1データベースやKVストレージなど、Cloudflareのサービスと簡単に統合できます
- SSR（サーバーサイドレンダリング）でmicroCMSからデータを取得し、5分間キャッシュで高速表示します

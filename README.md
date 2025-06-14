# Mise-Kae

VRMモデルを表示・操作するためのWebアプリケーションです。Three.jsと@pixiv/three-vrmを使用して、3Dモデルの表示とポーズ管理機能を提供します。

## 機能

- VRMモデルの3D表示
- モデルの回転・ズーム操作
- ポーズパネルによるポーズ管理
- レスポンシブ対応のUI
- インタラクティブなモデル操作
- 環境変数による設定管理

## 技術スタック

### フロントエンド
- **TypeScript** - 型安全な開発環境
- **React** (v19.1.0) - UIコンポーネント
- **Three.js** (v0.176.0) - 3Dグラフィックス
- **@pixiv/three-vrm** (v3.4.1) - VRMモデルサポート
- **Vite** (v6.3.5) - ビルドツール

### 開発ツール
- TypeScript (v5.4.2)
- Node.js (推奨: 18.x以上)
- npm

### デプロイ
- **Vercel** - 本番環境ホスティング

## プロジェクト構成

```
app/
├── src/                    # ソースコード
│   ├── components/        # Reactコンポーネント
│   │   ├── Scene/        # 3Dシーン関連
│   │   │   ├── Scene.ts  # メインシーン
│   │   │   ├── Camera.ts # カメラ制御
│   │   │   └── Lighting.ts # ライティング
│   │   └── VRMViewer/    # VRM表示関連
│   │       ├── VRMViewer.ts # VRMビューア
│   │       ├── PoseManager.ts # ポーズ管理
│   │       └── PoseControls.ts # ポーズUI
│   ├── types/            # TypeScript型定義
│   │   ├── env.d.ts      # 環境変数型定義
│   │   ├── poses/        # ポーズ定義
│   │   └── vrm.ts        # VRM関連型定義
│   ├── main.ts           # メインエントリーポイント
│   ├── App.tsx           # メインアプリケーションコンポーネント
│   └── index.css         # グローバルスタイル
├── public/               # 静的ファイル
│   └── assets/
│       └── models/      # VRMモデルファイル
├── dist/                # ビルド成果物（生成される）
├── package.json         # 依存関係とスクリプト
├── tsconfig.json        # TypeScript設定
├── vite.config.ts       # Vite設定
└── index.html           # HTMLテンプレート
vercel.json              # Vercelデプロイ設定
```

## セットアップ

### 必要条件
- Node.js (推奨バージョン: 18.x以上)
- npm

### インストール手順

1. リポジトリのクローン
```bash
git clone git@git.pepabo.com:bqnq/mise-kae.git
cd mise-kae
```

2. 依存関係のインストール
```bash
cd app
npm install
```

3. 開発サーバーの起動
```bash
npm run dev
```

4. ブラウザで http://localhost:8080 にアクセス

### 開発用コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド（型チェック付き）
npm run build

# 型チェックなしビルド（緊急時用）
npm run build-no-types

# ビルド成果物のプレビュー
npm run preview
```

## デプロイ手順

### Vercelでのデプロイ（推奨）

#### 1. 前提条件
- GitHubアカウント
- Vercelアカウント（GitHubでサインアップ可能）

#### 2. デプロイ手順

1. **Vercelにアクセス**
   - [vercel.com](https://vercel.com) にアクセス
   - GitHubアカウントでログイン

2. **プロジェクトのインポート**
   - Vercelダッシュボードで「**New Project**」をクリック
   - 「**Import Git Repository**」でGitHubリポジトリを選択
   - リポジトリ名：`mise-kae` を選択
   - ブランチ：`main` を選択（デフォルト）

3. **ビルド設定の確認**
   以下の設定が自動検出されることを確認：
   - **Framework Preset**: `Vite` または `Other`
   - **Root Directory**: `./` (ルートディレクトリのまま)
   - **Build Command**: `cd app && npm run build`
   - **Output Directory**: `app/dist`
   - **Install Command**: `cd app && npm install`

4. **デプロイ実行**
   - 「**Deploy**」ボタンをクリック
   - ビルドログを確認
   - デプロイ完了後、生成されたURLでアプリケーションを確認

#### 3. デプロイ後の確認事項
- [ ] アプリケーションが正常に動作するか
- [ ] VRMモデルが正しく読み込まれるか
- [ ] ポーズパネルが機能するか
- [ ] レスポンシブ対応が正しく機能するか
- [ ] パフォーマンスが期待通りか
- [ ] ブラウザコンソールにエラーが表示されていないか

### 手動デプロイ（その他のホスティングサービス）

#### 1. ビルド

```bash
cd app
npm run build
```

ビルド成果物は `app/dist` ディレクトリに生成されます。

#### 2. サーバー要件
- 静的ファイルを配信できるWebサーバー
- HTTPS対応（推奨）
- 適切なMIMEタイプ設定（.vrmファイル用）

#### 3. 必要なファイル
- `app/dist/` ディレクトリ内のすべてのファイル
- VRMモデルファイルも含まれています

#### 4. サーバー設定例（Nginx）

```nginx
server {
    listen 443 ssl;
    server_name your-domain.com;

    # SSL設定
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # ルートディレクトリ
    root /path/to/app/dist;
    index index.html;

    # 静的ファイルのキャッシュ設定
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }

    # VRMファイルのMIMEタイプ設定
    location ~* \.vrm$ {
        add_header Content-Type application/octet-stream;
    }

    # SPAのルーティング設定
    location / {
        try_files $uri $uri/ /index.html;
    }

    # セキュリティヘッダー
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
}
```

## 環境変数

現在のプロジェクトでは以下の環境変数が利用可能です：

| 変数名 | デフォルト値 | 説明 |
|--------|-------------|------|
| `VITE_APP_ENV` | `development` | アプリケーション環境 |
| `VITE_APP_BASE_URL` | `/` | ベースURL |
| `VITE_APP_MODEL_PATH` | `/assets/models/Sumisumi_VRM.vrm` | VRMモデルのパス |

### 環境変数の設定方法

#### 開発環境
`.env`ファイルを`app/`ディレクトリに作成：

```env
VITE_APP_ENV=development
VITE_APP_BASE_URL=/
VITE_APP_MODEL_PATH=/assets/models/Sumisumi_VRM.vrm
```

#### Vercel環境
Vercelダッシュボードの「Settings」→「Environment Variables」で設定

## トラブルシューティング

### よくある問題

#### 1. VRMモデルが表示されない
- モデルファイルが正しいパスに配置されているか確認
- ブラウザのコンソールでエラーを確認
- ネットワークタブでファイルの読み込み状況を確認

#### 2. ビルドエラー
```bash
# 依存関係の再インストール
cd app
rm -rf node_modules package-lock.json
npm install

# 型チェックなしでビルド（緊急時）
npm run build-no-types
```

#### 3. パフォーマンスの問題
- ブラウザの開発者ツールでパフォーマンスプロファイルを確認
- モデルのポリゴン数やテクスチャサイズを確認
- 不要なアニメーションやエフェクトを無効化

#### 4. TypeScriptエラー
現在の設定では型チェックが緩和されていますが、厳格な型チェックが必要な場合：

```bash
# 厳格な型チェック付きビルド
npm run build-with-types
```

## 開発ガイドライン

### コード規約
- TypeScriptを使用
- ESLintとPrettierの設定に従う
- コンポーネントは機能別にディレクトリを分ける

### ポーズの追加方法
1. `src/types/poses/`に新しいポーズファイルを作成
2. `src/types/poses/index.ts`にポーズを登録
3. VRMPose形式でポーズデータを定義

## ライセンス

ISC License

## 開発者

- 開発元: PEPABO
- リポジトリ: git@git.pepabo.com:bqnq/mise-kae.git 

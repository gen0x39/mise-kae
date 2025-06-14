# Mise-Kae

VRMモデルを表示・操作するためのWebアプリケーションです。Three.jsと@pixiv/three-vrmを使用して、3Dモデルの表示とポーズ管理機能を提供します。

## 機能

- VRMモデルの3D表示
- モデルの回転・ズーム操作
- ポーズパネルによるポーズ管理
- レスポンシブ対応のUI
- インタラクティブなモデル操作

## 技術スタック

### フロントエンド
- **TypeScript** - 型安全な開発環境
- **React** - UIコンポーネント
- **Three.js** (v0.176.0) - 3Dグラフィックス
- **@pixiv/three-vrm** (v3.4.1) - VRMモデルサポート
- **Vite** (v6.3.5) - ビルドツール

### 開発ツール
- TypeScript (v5.4.2)
- Node.js
- npm/yarn

## プロジェクト構成

```
app/
├── src/                    # ソースコード
│   ├── components/        # Reactコンポーネント
│   │   └── PosePanel.tsx  # ポーズ管理パネル
│   ├── utils/            # ユーティリティ関数
│   │   └── PoseFileManager.ts  # ポーズ定義管理
│   ├── types/            # TypeScript型定義
│   ├── main.ts           # メインエントリーポイント
│   ├── App.tsx           # メインアプリケーションコンポーネント
│   └── index.css         # グローバルスタイル
├── public/               # 静的ファイル
│   └── assets/
│       └── models/      # VRMモデルファイル
├── assets/              # その他のアセットファイル
└── js/                  # JavaScriptファイル
```

## セットアップ

### 必要条件
- Node.js (推奨バージョン: 18.x以上)
- npm または yarn

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
# または
yarn install
```

3. 開発サーバーの起動
```bash
npm run dev
# または
yarn dev
```

4. ブラウザで http://localhost:5173 にアクセス

## デプロイ手順

### ビルド

1. プロダクションビルドの作成
```bash
cd app
npm run build
# または
yarn build
```

ビルド成果物は `app/dist` ディレクトリに生成されます。

### デプロイ要件

#### 1. サーバー要件
- 静的ファイルを配信できるWebサーバー
- HTTPS対応（推奨）
- 適切なCORS設定
- 適切なMIMEタイプ設定

#### 2. 必要なファイル
- `dist/` ディレクトリ内のすべてのファイル
- VRMモデルファイル（`public/assets/models/`内のファイル）

#### 3. サーバー設定例（Nginx）

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    # HTTPSへのリダイレクト（推奨）
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;

    # SSL設定
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # ルートディレクトリ
    root /path/to/dist;
    index index.html;

    # 静的ファイルのキャッシュ設定
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
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

#### 4. 環境変数
現在のプロジェクトでは特別な環境変数は必要ありませんが、将来的に追加される可能性があります。

#### 5. デプロイ後の確認事項
- [ ] アプリケーションが正常に動作するか
- [ ] VRMモデルが正しく読み込まれるか
- [ ] ポーズパネルが機能するか
- [ ] レスポンシブ対応が正しく機能するか
- [ ] パフォーマンスが期待通りか
- [ ] エラーログの確認

### トラブルシューティング

#### 一般的な問題
1. **VRMモデルが表示されない**
   - モデルファイルが正しいパスに配置されているか確認
   - ブラウザのコンソールでエラーを確認
   - CORS設定を確認

2. **パフォーマンスの問題**
   - ブラウザの開発者ツールでパフォーマンスプロファイルを確認
   - モデルのポリゴン数やテクスチャサイズを確認
   - 不要なアニメーションやエフェクトを無効化

3. **ビルドエラー**
   - `node_modules`を削除して再インストール
   - TypeScriptの型定義を確認
   - 依存関係のバージョン互換性を確認

## ライセンス

ISC License

## 開発者

- 開発元: PEPABO
- リポジトリ: git@git.pepabo.com:bqnq/mise-kae.git 

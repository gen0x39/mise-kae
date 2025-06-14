import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 環境変数の読み込み
  const env = loadEnv(mode, process.cwd(), '');
  const isDevelopment = mode === 'development';

  return {
    plugins: [react()],
    
    // 開発サーバーの設定
    server: {
      port: 8080,
      open: true,
      // 開発環境でのホットリロード設定
      hmr: {
        overlay: true
      }
    },

    // ビルド設定
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // 開発環境でのみソースマップを生成
      sourcemap: isDevelopment,
      // チャンク分割の設定
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['react', 'react-dom'],
            'three': ['three'],
            'vrm': ['@pixiv/three-vrm']
          }
        }
      },
      // 本番環境での最適化設定
      minify: !isDevelopment,
      // アセットの最適化
      assetsInlineLimit: 4096, // 4kb以下のアセットはBase64としてインライン化
      chunkSizeWarningLimit: 1000, // チャンクサイズの警告閾値
    },

    // パスエイリアスの設定
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@types': path.resolve(__dirname, './src/types'),
        '@assets': path.resolve(__dirname, './src/assets')
      }
    },

    // 環境変数の定義
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV || mode),
      __APP_BASE_URL__: JSON.stringify(env.VITE_APP_BASE_URL || '/'),
      __APP_MODEL_PATH__: JSON.stringify(env.VITE_APP_MODEL_PATH || '/assets/models/Sumisumi_VRM.vrm')
    }
  };
}); 

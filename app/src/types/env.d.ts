/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: 'development' | 'production'
  readonly VITE_APP_BASE_URL: string
  readonly VITE_APP_MODEL_PATH: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// グローバル変数の型定義
declare const __APP_ENV__: 'development' | 'production'
declare const __APP_BASE_URL__: string
declare const __APP_MODEL_PATH__: string 

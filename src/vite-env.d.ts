/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STOVE_URL?: string
  readonly VITE_STOVE_JWT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


interface ImportMetaEnv {
    readonly VITE_NGROK_URL: string;
    // Добавьте другие переменные, если нужно
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

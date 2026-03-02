import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    clearScreen: false,
    server: {
        port: 1420,
        strictPort: true,
        host: process.env.TAURI_DEV_HOST || false,
        hmr: process.env.TAURI_DEV_HOST ? {
            protocol: 'ws',
            host: process.env.TAURI_DEV_HOST,
            port: 1421,
        } : undefined,
        watch: {
            ignored: ['**/src-tauri/**'],
        },
    },
});

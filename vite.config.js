import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({

    server: {
        host: '192.168.41.34',
        port: 5500,
        strictPort: true,
        hmr: {
            host: '192.168.41.34',
        },
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});

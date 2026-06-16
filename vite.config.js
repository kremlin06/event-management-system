import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';

import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {

      '@components': path.resolve(__dirname, './src/components'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@services': path.resolve(__dirname, './src/services'),
      '@Shared': path.resolve(__dirname, './src/components/Dashboards/Shared'),
      '@SVGs': path.resolve(__dirname, './src/components/SVGs'),
    },
  },






  optimizeDeps: {
    include: ['recharts'],
  },






  build: {
    rollupOptions: {
      output: {
        manualChunks: {

          'react-vendor': ['react', 'react-dom', 'react-router-dom'],

          recharts: ['recharts'],

          styled: ['styled-components'],
        },
      },
    },
  },
  server: {
    port: 5173,

    proxy: {






      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,

        secure: false,
      },
    },
  },
});

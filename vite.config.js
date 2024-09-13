import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://panel.serviciosd.com/',
        changeOrigin: true,
      },
      '/codigo_recuperacion': {
        target: 'https://panel.serviciosd.com/',
        changeOrigin: true,
      },
      '/cambiar_clave': {
        target: 'https://panel.serviciosd.com/',
        changeOrigin: true,
      },
    },
  },
});
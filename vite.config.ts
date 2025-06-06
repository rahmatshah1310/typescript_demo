import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, 'src/api/api.ts'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@components': path.resolve(__dirname, 'src/components/components.ts'),
      '@layouts': path.resolve(__dirname, 'src/layouts/layouts.ts'),
      '@constants': path.resolve(__dirname, 'src/constants/constants.ts'),
      '@context': path.resolve(__dirname, 'src/context/context.ts'),
      '@hooks': path.resolve(__dirname, 'src/hooks/hooks.ts'),
      '@pages': path.resolve(__dirname, 'src/pages/pages.ts'),
      '@services': path.resolve(__dirname, 'src/services/services.ts'),
      '@types': path.resolve(__dirname, 'src/types/types.ts'),
      '@utils': path.resolve(__dirname, 'src/utils/utils.ts'),
    },
  },
});

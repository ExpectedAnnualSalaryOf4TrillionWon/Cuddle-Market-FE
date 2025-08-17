import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@layout', replacement: '/src/components/layout' },
      { find: '@icons', replacement: '/src/components/icons' },
      { find: '@features', replacement: '/src/features' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@common', replacement: '/src/components/common' },
      { find: '@images', replacement: '/public/assets/images' },
      { find: '@store', replacement: '/src/store' },
    ],
  },
});

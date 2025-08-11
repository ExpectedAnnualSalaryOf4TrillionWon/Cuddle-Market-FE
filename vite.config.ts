import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@components', replacement: '/src/components' },
      { find: '@icons', replacement: '/src/components/icons' },
      { find: '@features', replacement: '/src/features' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@common', replacement: '/src/components/common' },
    ],
  },
});

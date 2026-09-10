import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./setupTests.ts'],
    globals: true,
    css: false,
    pool: 'threads',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@asamuzakjp/css-color': path.resolve(__dirname, './mock-css-color.js'),
    },
  },
});

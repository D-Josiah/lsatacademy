import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Unit + component tests run under Vitest in a jsdom DOM. Playwright e2e lives in
// /e2e and is run separately (it has its own config), so we exclude it here.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: './vitest.setup.js',
    include: ['src/**/*.{test,spec}.{js,jsx}'],
    exclude: ['e2e/**', 'node_modules/**'],
    css: false,
  },
});

import { defineConfig, devices } from '@playwright/test';

// E2E runs against a locally-served production build (`npm run preview`).
// Vitest owns the unit/component tests under src/, so Playwright only looks in /e2e.
const PORT = 4173;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // Build + serve the app for the duration of the run. Reuses an already-running
  // server locally so the dev loop is fast.
  webServer: {
    command: 'npm run build:no-prerender && npm run preview -- --port ' + PORT,
    url: `http://localhost:${PORT}`,
    timeout: 120_000,
    reuseExistingServer: !process.env.CI,
  },
});

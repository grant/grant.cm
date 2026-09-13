import {defineConfig} from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  outputDir: 'test-results',
  forbidOnly: Boolean(process.env.CI),
  reporter: 'line',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    browserName: 'chromium',
    colorScheme: 'light',
    locale: 'en-US',
    reducedMotion: 'reduce',
    timezoneId: 'UTC',
    viewport: {width: 1280, height: 720},
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});

import { defineConfig, devices } from '@playwright/test';

const testPort = Number(process.env.PORTFOLIO_TEST_PORT ?? 3100);
if (!Number.isInteger(testPort) || testPort < 1024 || testPort > 65535) throw new Error('PORTFOLIO_TEST_PORT must be a valid unprivileged port.');
const testUrl = `http://localhost:${testPort}`;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 45_000,
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: testUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    { name: 'desktop-chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
  ],
  webServer: {
    command: `npm run dev:test -- --port ${testPort}`,
    url: testUrl,
    reuseExistingServer: true,
    timeout: 120_000,
  },
});

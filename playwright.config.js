// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

 use: {
  headless: true,
  viewport: { width: 1280, height: 720 },
  ignoreHTTPSErrors: true,
},

  projects: [
    {
      name: 'qauto-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto.forstudy.space/',
      },
    },
    {
      name: 'qauto2-chromium',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://qauto2.forstudy.space/',
      },
    },
  ],
});
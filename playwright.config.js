import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const envName = process.env.TEST_ENV || 'qauto';

dotenv.config({
  path: `.env.${envName}`,
});

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

    baseURL: process.env.BASE_URL,

    httpCredentials: {
      username: process.env.HTTP_USERNAME,
      password: process.env.HTTP_PASSWORD,
    },
  },

  projects: [
    {
      name: 'setup',
      testMatch: /setup\.js/,
    },
    {
      name: 'qauto',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'qauto2',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'storageState.json',
      },
      dependencies: ['setup'],
    },
  ],
});



  
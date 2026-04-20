import { test as setup } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';

setup('login and save storage', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login(
    process.env.USER_EMAIL,
    process.env.USER_PASSWORD
  );

  await page.waitForURL(/garage/);

  await page.context().storageState({ path: 'storageState.json' });
});
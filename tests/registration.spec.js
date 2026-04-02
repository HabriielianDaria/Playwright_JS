import { test, expect } from '@playwright/test';

function generateEmail() {
  return `aqa-${Date.now()}@test.com`;
}

async function openSignup(page) {
  await page.goto('https://qauto.forstudy.space/');
  await page.getByRole('button', { name: 'Sign up' }).click();
}

test.describe('Registration form', () => {

  test('Successful registration', async ({ page }) => {
    await openSignup(page);

    const email = generateEmail();

    await page.locator('#signupName').fill('Daria');
    await page.locator('#signupLastName').fill('Habriielian');
    await page.locator('#signupEmail').fill(email);
    await page.locator('#signupPassword').fill('Password1');
    await page.locator('#signupRepeatPassword').fill('Password1');

    await page.getByRole('button', { name: 'Register' }).click();

    await expect(page).toHaveURL(/garage/);
  });

  test('Empty Name', async ({ page }) => {
    await openSignup(page);

    const nameInput = page.locator('#signupName');

    await nameInput.click(); 
    await nameInput.blur(); 

    await expect(nameInput).toHaveClass(/ng-invalid/);
});

  test('Empty Last Name', async ({ page }) => {
    await openSignup(page);

    const nameInput = page.locator('#signupLastName');

    await nameInput.click(); 
    await nameInput.blur(); 

    await expect(nameInput).toHaveClass(/ng-invalid/);
});

  test('Invalid email', async ({ page }) => {
    await openSignup(page);

    await page.locator('#signupEmail').fill('test@');
    await page.locator('#signupEmail').blur();

    await expect(page.locator('#signupEmail')).toHaveClass(/ng-invalid/);
  });

  test('Password too short', async ({ page }) => {
    await openSignup(page);

    await page.locator('#signupPassword').fill('Pass1');
    await page.locator('#signupPassword').blur();

    await expect(page.locator('#signupPassword')).toHaveClass(/ng-invalid/);
  });

  test('Passwords do not match', async ({ page }) => {
    await openSignup(page);

    await page.locator('#signupPassword').fill('Password1');
    await page.locator('#signupRepeatPassword').fill('Password2');

    await page.locator('#signupRepeatPassword').blur();

    await expect(page.locator('#signupRepeatPassword')).toHaveClass(/is-invalid/);
  });

  test('Register button disabled', async ({ page }) => {
    await openSignup(page);

    const btn = page.getByRole('button', { name: 'Register' });

    await expect(btn).toBeDisabled();
  });

});
import { test, expect } from '@playwright/test';
import { SignupPage } from '../pages/SignupPage';
import { generateUser } from '../utils/userFactory';

test.describe('Registration form (POM)', () => {

  test('Successful registration', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const user = generateUser();

    await signupPage.open();
    await signupPage.register(user);

    await expect(page).toHaveURL(/garage/);
  });

  test('Empty Name', async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.open();

    await signupPage.nameInput.click();
    await signupPage.nameInput.blur();

    await expect(signupPage.nameInput).toHaveClass(/ng-invalid/);
  });

  test('Empty Last Name', async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.open();

    await signupPage.lastNameInput.click();
    await signupPage.lastNameInput.blur();

    await expect(signupPage.lastNameInput).toHaveClass(/ng-invalid/);
  });

  test('Invalid email', async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.open();

    await signupPage.emailInput.fill('test@');
    await signupPage.emailInput.blur();

    await expect(signupPage.emailInput).toHaveClass(/ng-invalid/);
  });

  test('Password too short', async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.open();

    await signupPage.passwordInput.fill('Pass1');
    await signupPage.passwordInput.blur();

    await expect(signupPage.passwordInput).toHaveClass(/ng-invalid/);
  });

  test('Passwords do not match', async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.open();

    await signupPage.passwordInput.fill('Password1');
    await signupPage.repeatPasswordInput.fill('Password2');
    await signupPage.repeatPasswordInput.blur();

    await expect(signupPage.repeatPasswordInput).toHaveClass(/is-invalid/);
  });

  test('Register button disabled', async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.open();

    await expect(signupPage.registerBtn).toBeDisabled();
  });

});
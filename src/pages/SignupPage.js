import { expect } from '@playwright/test';

export class SignupPage {
  constructor(page) {
    this.page = page;

    this.nameInput = page.locator('#signupName');
    this.lastNameInput = page.locator('#signupLastName');
    this.emailInput = page.locator('#signupEmail');
    this.passwordInput = page.locator('#signupPassword');
    this.repeatPasswordInput = page.locator('#signupRepeatPassword');
    this.registerBtn = page.getByRole('button', { name: 'Register' });
    this.signupBtn = page.getByRole('button', { name: 'Sign up' });
  }

  async open() {
    await this.page.goto('/');
    await this.signupBtn.click();
  }

  async fillForm(user) {
    await this.nameInput.fill(user.name);
    await this.lastNameInput.fill(user.lastName);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
    await this.repeatPasswordInput.fill(user.password);
  }

  async clickRegister() {
    await this.registerBtn.click();
  }

  async register(user) {
    await this.fillForm(user);
    await this.clickRegister();
  }
}
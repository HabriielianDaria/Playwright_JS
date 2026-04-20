export class LoginPage {
  constructor(page) {
    this.page = page;

    this.signInBtn = page.getByRole('button', { name: 'Sign in' });
    this.emailInput = page.locator('#signinEmail');
    this.passwordInput = page.locator('#signinPassword');
    this.loginBtn = page.getByRole('button', { name: 'Login' });
  }

  async open() {
    await this.page.goto('/');
    await this.signInBtn.click();
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }
}
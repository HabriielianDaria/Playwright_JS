export class GaragePage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/panel/garage');
  }
}
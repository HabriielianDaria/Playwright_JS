import { test, expect } from '../src/fixtures/userGarageFixture';

test.describe('User Profile', () => {
  test('should display mocked data on profile page', async ({ userGaragePage }) => {
    const page = userGaragePage.page;

    const mockData = {
      status: 'ok',
      data: {
        photoFilename: 'audi.png',
        name: 'Daria324',
        lastName: 'Playwright-Test',
      },
    };

    await page.route('**/api/users/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData),
      });
    });

    await page.goto('/panel/profile');

    const profileName = page.locator('.profile_name');

    await expect(profileName).toHaveText(
      `${mockData.data.name} ${mockData.data.lastName}`
    );
  });
});
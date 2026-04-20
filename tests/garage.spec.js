import { test, expect } from '../src/fixtures/userGarageFixture';

test('User is already logged in', async ({ userGaragePage }) => {
  await expect(userGaragePage.page).toHaveURL(/garage/);
});
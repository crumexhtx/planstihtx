import { expect, test } from '@playwright/test';

test('sample trip opens a shareable Tokyo estimate', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('link', { name: 'Try a sample trip' }).first().click();

  await expect(page).toHaveURL(/\/destinations\/tokyo\?origin=houston&days=7&travelers=2/);
  await expect(
    page.getByRole('heading', { name: 'Estimating a trip to Tokyo' }),
  ).toBeVisible();
  await expect(page.getByLabel('Starting city')).toHaveValue('houston');
  await expect(page.locator('#group-size')).toHaveValue('2');
  await expect(
    page.getByRole('heading', { name: 'Your trip estimate' }),
  ).toBeVisible();
});

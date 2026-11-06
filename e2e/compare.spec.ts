import { expect, test } from '@playwright/test';

test('compare index groups pairs by region', async ({ page }) => {
  await page.goto('/compare');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Europe' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Asia' })).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'North America' }),
  ).toBeVisible();
  await expect(
    page.getByRole('link', { name: /Budapest vs Prague/i }),
  ).toBeVisible();
  await page.screenshot({
    path: 'test-results/header-search/compare-index.png',
    fullPage: true,
  });
});

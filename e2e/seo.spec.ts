import { expect, test } from '@playwright/test';

test('destination page has one h1 and one JSON-LD script after hydration', async ({
  page,
}) => {
  await page.goto('/destinations/tokyo');

  await expect(
    page.getByRole('heading', { level: 1, name: /Tokyo/ }),
  ).toBeVisible();
  await expect(page.locator('#seo-static')).toHaveCount(0);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(
    page.locator('script[type="application/ld+json"]'),
  ).toHaveCount(1);
});

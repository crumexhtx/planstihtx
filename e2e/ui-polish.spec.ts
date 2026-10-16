import { expect, test, type Page } from '@playwright/test';

test.setTimeout(60_000);

async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.addInitScript((nextTheme) => {
    localStorage.setItem('plansti.theme', nextTheme);
  }, theme);
}

async function pageOverflows(page: Page) {
  return page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  );
}

test('homepage origin is shared and destination combobox selects a city', async ({
  page,
}) => {
  await page.goto('/');

  await page
    .locator('.budget-matcher')
    .getByLabel('Starting city')
    .selectOption('chicago');
  await expect(
    page.locator('#trip-planner').getByLabel('Starting city'),
  ).toHaveValue('chicago');

  const destinationInput = page.getByRole('combobox', {
    name: 'Target destination',
  });
  await destinationInput.click();
  await destinationInput.fill('Paris');
  await page
    .locator('.destination-combobox__list')
    .getByRole('option', { name: 'Paris, France' })
    .click();
  await expect(destinationInput).toHaveValue('Paris, France');
});

test('directory cards show a hero photo and city pages stay in viewport', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/destinations');
  await expect(page.getByRole('button', { name: /theme/i })).toBeVisible();
  await expect(page.locator('img.destinations-index__hero').first()).toBeVisible();
  await expect(page.locator('.destinations-index__flag').first()).toBeVisible();
  expect(await pageOverflows(page)).toBe(false);

  await page.goto('/destinations/tokyo');
  await expect(page.getByRole('heading', { level: 1, name: /Tokyo/ })).toBeVisible();
  expect(await pageOverflows(page)).toBe(false);
});

for (const theme of ['light', 'dark'] as const) {
  for (const width of [375, 1280] as const) {
    test(`captures ${theme} ${width}px homepage and Tokyo`, async ({ page }) => {
      await setTheme(page, theme);
      await page.setViewportSize({
        width,
        height: width === 375 ? 812 : 800,
      });

      await page.goto('/');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await page.screenshot({
        path: `test-results/audit-ui/home-${theme}-${width}.png`,
        fullPage: true,
      });
      expect(await pageOverflows(page)).toBe(false);

      await page.goto('/destinations');
      await expect(page.getByRole('button', { name: /theme/i })).toBeVisible();
      await expect(page.locator('img.destinations-index__hero').first()).toBeVisible();
      await page.screenshot({
        path: `test-results/audit-ui/destinations-${theme}-${width}.png`,
        fullPage: false,
      });
      expect(await pageOverflows(page)).toBe(false);

      await page.goto('/destinations/tokyo');
      await expect(
        page.getByRole('heading', { level: 1, name: /Tokyo/ }),
      ).toBeVisible();
      await page.screenshot({
        path: `test-results/audit-ui/tokyo-${theme}-${width}.png`,
        fullPage: true,
      });
      expect(await pageOverflows(page)).toBe(false);
    });
  }
}

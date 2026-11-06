import { expect, test, type Page } from '@playwright/test';

test.setTimeout(60_000);

async function setTheme(page: Page, theme: 'light' | 'dark') {
  await page.addInitScript((nextTheme) => {
    localStorage.setItem('plansti.theme', nextTheme);
  }, theme);
}

test('header search on About goes to Lisbon on Enter', async ({ page }) => {
  await page.goto('/about');
  const search = page.getByRole('combobox', { name: 'Search cities' });
  await search.fill('lis');
  await search.press('Enter');
  await expect(page).toHaveURL(/\/destinations\/lisbon\/?$/);
  await expect(page.getByRole('heading', { level: 1, name: /Lisbon/ })).toBeVisible();
});

for (const theme of ['light', 'dark'] as const) {
  for (const width of [375, 768, 1280] as const) {
    test(`captures header search at ${theme} ${width}px`, async ({ page }) => {
      await setTheme(page, theme);
      await page.setViewportSize({
        width,
        height: width === 1280 ? 800 : 812,
      });
      await page.goto('/about');
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const search = page.getByRole('combobox', { name: 'Search cities' });
      await expect(search).toBeVisible();
      await search.fill('lis');
      await expect(
        page.locator('.app-shell__search .destination-combobox__list'),
      ).toBeVisible();
      await page.screenshot({
        path: `test-results/header-search/about-${theme}-${width}.png`,
        fullPage: false,
      });
    });
  }
}

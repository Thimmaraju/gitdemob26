// @ts-check
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {

  test.slow()
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.

  await expect.soft(page.locator('//img[@src2="img/logos/Browsers.png"]')).toBeVisible()
  await expect(page).toHaveTitle(/Playwright/);

});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
 // await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
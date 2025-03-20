const { test, expect } = require('@playwright/test');

test.describe("Verify Stubbing 2", () => {
  test("Verify status code stubbed to 400", async ({ page }) => {
    // Intercept the specific GET request and override only the status code to 400.
    await page.route(
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC",
      async (route) => {
        // Fetch the original response from the server.
        const originalResponse = await route.fetch();
        const body = await originalResponse.text();

        // Fulfill the request with the original response body and headers, but override status code to 400.
        await route.fulfill({
          status: 400,
          contentType: originalResponse.headers()['content-type'],
          headers: originalResponse.headers(),
          body,
        });
      }
    );

    // Navigate to the application and perform login.
    await page.goto("https://opensource-demo.orangehrmlive.com");
    await page.fill('input[name="username"]', "Admin");
    await page.fill('input[name="password"]', "admin123");
    await page.click('button[type="submit"]');

    // Verify that the main menu item is visible.
    await expect(page.locator("a.oxd-main-menu-item.active")).toBeVisible();

    // Navigate to the PIM module which will trigger the intercepted request.
    await page.click('a[href="/web/index.php/pim/viewPimModule"]');

    // Wait for the intercepted response and assert that its status code is 400.
    const response = await page.waitForResponse(
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC"
    );
    expect(response.status()).toBe(400);
  });
});

const { test, expect } = require('@playwright/test');

test.describe('Verify PIM calls Spying', () => {
  test('Spying class example', async ({ page }) => {
    // Set up wait-for-response promises for each endpoint
    const getEmployeesPromise = page.waitForResponse(request =>
      request.url().includes('/api/v2/pim/employees') &&
      request.request().method() === 'GET'
    );
    const empStatusPromise = page.waitForResponse(request =>
      request.url().includes('/api/v2/admin/employment-statuses') &&
      request.request().method() === 'GET'
    );
    const jobTitlesPromise = page.waitForResponse(request =>
      request.url().includes('/api/v2/admin/job-titles') &&
      request.request().method() === 'GET'
    );
    const subunitsPromise = page.waitForResponse(request =>
      request.url().includes('/api/v2/admin/subunits') &&
      request.request().method() === 'GET'
    );
    // const rajuPromise = page.waitForResponse(request =>
    //   request.url().includes('/raju') &&
    //   request.request().method() === 'GET'
    // );

    // Navigate to the app and perform login
    // await page.goto('https://opensource-demo.orangehrmlive.com');
    // await page.fill('input[name="username"]', 'Admin');
    // await page.fill('input[name="password"]', 'admin123');
    // await page.click('button[type="submit"]');
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
    // Verify the main menu item is visible
    await expect(page.locator('a.oxd-main-menu-item.active')).toBeVisible();

    // Navigate to the PIM module
    await page.click('a[href="/web/index.php/pim/viewPimModule"]');

    // Wait for and verify the responses
    const getEmployeesResponse = await getEmployeesPromise;
    expect(getEmployeesResponse.status()).toBe(200);

    const subunitsResponse = await subunitsPromise;
    expect(subunitsResponse.status()).toBe(200);

    const jobTitlesResponse = await jobTitlesPromise;
    expect(jobTitlesResponse.status()).toBe(200);

    const empStatusResponse = await empStatusPromise;
    expect(empStatusResponse.status()).toBe(200);

    // const rajuResponse = await rajuPromise;
    // expect(rajuResponse.status()).toBe(200);
  });
});

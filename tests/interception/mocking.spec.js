const { test, expect } = require('@playwright/test');
const { URL } = require('url'); // Used for modifying query parameters

test("Example for Mocking", async ({ page }) => {
  // Intercept and modify the API request query parameters
  await page.route(
    "**/api/v2/pim/employees*", // Matches any request to employees API
    async (route) => {
      const originalRequest = route.request();
      const url = new URL(originalRequest.url());

      // Modify query parameters as required
      url.searchParams.set("limit", "2");
      url.searchParams.set("sortOrder", "DESC");
      url.searchParams.set("sortField", "employee.employeeId");

      // Continue the request with modified query parameters
      await route.continue({ url: url.toString() });
    }
  );

  // Navigate to the application and perform login
  // await page.goto("https://opensource-demo.orangehrmlive.com");
  // await page.fill('input[name="username"]', "Admin");
  // await page.fill('input[name="password"]', "admin123");
  // await page.click('button[type="submit"]');
  await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
    
  // Verify that the main menu item is visible
  await expect(page.locator("a.oxd-main-menu-item.active")).toBeVisible();

  // Click on the PIM module (this triggers the modified request)
  await page.click('a[href="/web/index.php/pim/viewPimModule"]');

  // Wait for the API response and assert the status code
  const response = await page.waitForResponse((resp) =>
    resp.url().includes("/api/v2/pim/employees") && resp.status() === 200
  );
  expect(response.status()).toBe(200);

  // Log test completion
  console.log("Test Execution is Completed");
});

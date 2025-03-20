const { test, expect } = require('@playwright/test');

test("Example Stubbing network errors", async ({ page }) => {
    // Intercept the request and force a network error
    await page.route(
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC",
        async (route) => {
            await route.abort(); // Simulate a network failure
        }
    );

    // Navigate to the application and perform login
    await page.goto("https://opensource-demo.orangehrmlive.com");
    await page.fill('input[name="username"]', "Admin");
    await page.fill('input[name="password"]', "admin123");
    await page.click('button[type="submit"]');

    // Verify that the main menu item is visible
    await expect(page.locator("a.oxd-main-menu-item.active")).toBeVisible();

    // Click on the PIM module
    await page.click('a[href="/web/index.php/pim/viewPimModule"]');

    // Wait for the failed API response
    //   await page.waitForResponse(
    //     (response) => response.url().includes("/api/v2/pim/employees") 
    //     //&& response.status() >= 400
    //   );

    let errorLogged = false;

    // Capture console errors
    page.on('console', message => {
        if ( message.text()) {
            errorLogged = true;
            console.log(`Console error detected: ${message.text()}`);
        }
    });

});

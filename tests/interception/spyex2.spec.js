const { test, expect } = require('@playwright/test');

test('Spy on network responses using event listeners', async ({ page }) => {
    // Create an object to hold the responses you're interested in
    const responses = {};

    // Listen for every response on the page
    page.on('response', async (response) => {
        const url = response.url();

        if (url.includes('/api/v2/pim/employees')) {
            responses.getEmployees = response;
        } 
        
        else if (url.includes('/api/v2/admin/employment-statuses')) {
            responses.empStatus = response;
        } 
        else if (url.includes('/api/v2/admin/job-titles')) {
            responses.jobTitles = response;
        } else if (url.includes('/api/v2/admin/subunits')) {
            responses.subunits = response;
        }
        // else if (url.includes('/raju')) {
        //     responses.raju = response;
        // }
    });

    // Navigate to the application and perform login
    await page.goto('https://opensource-demo.orangehrmlive.com');
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    // Verify that the main menu item is visible
    await expect(page.locator('a.oxd-main-menu-item.active')).toBeVisible();

    // Navigate to the PIM module (this triggers the network requests)
    await page.click('a[href="/web/index.php/pim/viewPimModule"]');

    // Wait for the responses to be captured
    // You might need to wait a bit for all network requests to finish, e.g., by waiting for an element or a specific network call
    await page.waitForTimeout(2000); // Adjust timeout as needed

    // Now, assert the captured responses
    expect(responses.getEmployees).toBeTruthy();
    expect(await responses.getEmployees.status()).toBe(200);

    expect(responses.empStatus).toBeTruthy();
    expect(await responses.empStatus.status()).toBe(200);

    expect(responses.jobTitles).toBeTruthy();
    expect(await responses.jobTitles.status()).toBe(200);

    expect(responses.subunits).toBeTruthy();
    expect(await responses.subunits.status()).toBe(200);

    // expect(responses.raju).toBeTruthy();
    // expect(await responses.raju.status()).toBe(200);
});

const { test, expect } = require('@playwright/test');

test.describe("Verify Stubbing Get Employees API", () => {
  test("Stubbing Example", async ({ page }) => {

    // Intercept the GET request and stub the response
    await page.route(
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: [
              {
                empNumber: 7,
                lastName: "G",
                firstName: "Ganesh",
                middleName: "",
                employeeId: "1111",
                terminationId: null,
                jobTitle: {
                  id: 23,
                  title: "HR Manager",
                  isDeleted: true,
                },
                subunit: {
                  id: 13,
                  name: "Human Resources",
                },
                empStatus: {
                  id: 3,
                  name: "Full-Time Permanent",
                },
                supervisors: [],
              },

              {
                empNumber: 8,
                lastName: "Bangaram",
                firstName: "Prakash",
                middleName: "",
                employeeId: "2222",
                terminationId: null,
                jobTitle: {
                  id: 23,
                  title: "QA Engineer",
                  isDeleted: true,
                },
                subunit: {
                  id: 13,
                  name: "QA",
                },
                empStatus: {
                  id: 3,
                  name: "Full-Time Permanent",
                },
                supervisors: [],
              },
            ],
            meta: { total: 30 },
            rels: [],
          }),
        });
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

    // Navigate to the PIM module (this will trigger the intercepted network request)
    await page.click('a[href="/web/index.php/pim/viewPimModule"]');

    // Wait for the intercepted response and verify its status code
    const response = await page.waitForResponse(
      "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees?limit=50&offset=0&model=detailed&includeEmployees=onlyCurrent&sortField=employee.firstName&sortOrder=ASC"
    );
    expect(response.status()).toBe(200);

    // Optionally, you could verify that the stubbed data is rendered on the page.
    // For example:
//   await expect(page.locator("div.oxd-table-body div:nth-child(5) div")).toContainText("HR Manager");
  });
});

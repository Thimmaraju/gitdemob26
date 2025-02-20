const { test, expect } = require('@playwright/test');


test.describe('Read Env file ', () => {

    test('Verify login with valid credentials-env', async ({ page }) => {

    //    await page.goto('https://demo.applitools.com/index.html')
    //    await page.locator('#username').fill("JackG_REG")
    //    await page.locator("#password").fill("jack@123")

    await page.goto(process.env.WEB_URL)
    await page.locator('#username').fill(process.env.APP_USERNAME)
    await page.locator("#password").fill(process.env.APP_PASSWORD)
    await page.locator('#log-in').click()

       await page.waitForTimeout(5000)
    });

})

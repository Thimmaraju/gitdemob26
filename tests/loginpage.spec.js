const { test, expect } = require('@playwright/test');

import { loginPage } from "../pageObjects/loginPage.po"

import data from "../testData/login/logindata.json"


test.describe('Login Page Tests', () => {

    let login;

    test.beforeEach(async ({ page }) => {
        login = new loginPage(page);
        await login.launchUrl()
    });

    // test(`Verify logo, title, url visibility`, async () => {

    //     await expect(this.page).toHaveTitle("OrangeHRM");
    //     await expect(this.page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    //     await expect(this.page.locator('img[alt="company-branding"]')).toBeVisible()


    // });


    test('Verify login with valid credentials', async ({ page }) => {

        await login.launchUrl()
        await login.loginwithCreds(data.username, data.password)
        await login.loginsuccess()

    });



    test('Verify login with valid username and Invalid password', async () => {

        await login.loginwithCreds(data.username, data.invalidpassword)
        await login.loginfail()
    });

    test('Verify login with invalid username and valid password', async ({ page }) => {

        await login.loginwithCreds(data.username, data.invalidpassword)
        await login.loginfail()
    });

    test('Verify login with invalid username and invalid password', async ({ page }) => {
        await login.loginwithCreds(data.username, data.invalidpassword)
        await login.loginfail()

    });


})







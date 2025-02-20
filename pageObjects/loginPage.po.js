const { expect } = require('@playwright/test');

exports.loginPage = class loginPage {

    constructor(page) {
        this.page = page;
        this.usernameInput = 'input[name="username"]'
        this.passwordInput = 'input[name="password"]'
        this.loginBtn = 'button[type="submit"]'
        this.loginErrorMessage = 'Invalid credentials'

    }

    async launchUrl(){

        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async loginwithCreds(username, password) {

        await this.page.locator(this.usernameInput).fill(username)
        await this.page.locator(this.passwordInput).fill(password)
        await this.page.locator(this.loginBtn).click()
    }

    async loginsuccess(){

        const pageUrl = await this.page.url()
        console.log(pageUrl)
        await expect(this.page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    }

    async loginfail() {

        await expect(this.page.getByText(this.loginErrorMessage)).toBeVisible();
        
    }


}
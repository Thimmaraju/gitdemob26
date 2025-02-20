const { expect } = require('@playwright/test');

exports.addJobtitlPage = class addJobtitlPage {

    constructor(page) {
        this.page = page;
        this.adminBtn = "//span[text()='Admin']"
        this.jobBtn = "(//span[@class='oxd-topbar-body-nav-tab-item'])[2]"
        this.jobtileBtn = "(//a[@class='oxd-topbar-body-nav-tab-link'])[1]"
        this.addBtn = `//button[@type="button"and @class="oxd-button oxd-button--medium oxd-button--secondary"]`
        this.jobtitleInput = "(//input[@class='oxd-input oxd-input--active'])[2]"
        this.jobdiscripInput = `//textarea[@placeholder="Type description here"]`
        this.addnoteInput = `//textarea[@placeholder="Add note"]`
        this.saveBtn = '//button[@type="submit" and @class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]'
        this.errorMessage = "//span[text()='Required']"

    }


    async gotoaddjobTilePage()
    {
        await this.page.locator(this.adminBtn).click()
        await this.page.locator(this.jobBtn).click()
        await this.page.locator(this.jobtileBtn).click()
        await this.page.locator(this.addBtn).click()
    }

      
    async navigatedToJobtitlePAge()
    {
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveJobTitle')

    }

    async filljobTitle(jobtitle, jobdiscription, addnote)
    {
     
    let r = (Math.random() + 1).toString(36).substring(7);
    console.log(r)
    await this.page.locator(this.jobtitleInput).fill(jobtitle+r)
    await this.page.locator(this.jobdiscripInput).fill(jobdiscription)
    //upload file 
    await this.page.locator(this.addnoteInput).fill(addnote)
    await this.page.locator(this.saveBtn).click()

    }

    async clickonSave(){

        await this.page.locator(this.saveBtn).click()
    }

    async viewjobList()
    {
        await expect(this.page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList')

    }

    async errorMessagevisible(){

        await expect(this.page.locator(this.errorMessage)).toBeVisible()
    }

}

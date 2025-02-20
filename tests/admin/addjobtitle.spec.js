const { test, expect } = require('@playwright/test');
import  dataforlogin from "../../testData/login/logindata.json"
import addjobtitledata from "../../testData/admin/addjobtitle.json"

const jobtitles = ["Automation tester 1","Automation tester 2", "Automation tester 3"]

jobtitles.forEach(element => {

  test(`Verify user can add the Job title - ${element}`, async ({ page }) => {


    // await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    //   await page.locator('input[name="username"]').fill(dataforlogin.username)
    //   await page.locator("input[type='password']").fill(dataforlogin.password)
    //   await page.locator("button[type='submit']").click()
  
      await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
      
      await page.locator("(//a[@class='oxd-main-menu-item'])[1]").click()
      await page.locator("//span[normalize-space(text())='Job']").click()
   
      await page.locator("//a[normalize-space(text())='Job Titles']").click()
  
      await page.locator("//button[contains(.,'Add')]").click()
  
      await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveJobTitle')
      let randomchars = (Math.random() + 1).toString(36).substring(7);
      console.log(randomchars) 
      await page.locator("(//input[@class='oxd-input oxd-input--active'])[2]").fill(element+randomchars)
      await page.locator("//textarea[@placeholder='Type description here']").fill(addjobtitledata.jobdescription)
      await page.locator("//button[@type='submit']").click()
  
      await expect(page).toHaveURL("https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewJobTitleList")
    
    });
  
});


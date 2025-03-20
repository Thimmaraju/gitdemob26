import { test, expect } from '@playwright/test';

import qadata from "../../testData/qa/qadata.json"
import stagingdata from "../../testData/staging/stagingdata.json"


test.describe("Group 1", async () => {

    let testdata = null 

    test.beforeAll(async () => {

        if(process.env.ENV == "qa"){

            testdata = qadata
        }
        else{

            testdata = stagingdata
        }
    })

    test('test', async ({ page }) => {
        await page.setViewportSize({width: 1536, height: 816})
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        
        await page.locator("input[name='username']").click();
        await page.getByPlaceholder('Username').fill('Admin');
        await page.getByPlaceholder('Password').click();
        await page.getByPlaceholder('Password').fill('admin123');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByText('Time at Work')).toBeVisible();
        await page.getByRole('link', { name: 'PIM' }).click();
        await page.getByRole('link', { name: 'Add Employee' }).click();
        await page.getByPlaceholder('First Name').click();
        await page.getByPlaceholder('First Name').fill(testdata.firstname);
        await page.getByPlaceholder('Middle Name').click();
        await page.getByPlaceholder('Middle Name').fill('abc');
        await page.getByPlaceholder('Last Name').click();
        await page.getByPlaceholder('Last Name').fill(testdata.lastname);
        await page.getByRole('button', { name: 'Save' }).click();
        await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
        await page.screenshot({ path: 'screenshot.png' });
      });

})


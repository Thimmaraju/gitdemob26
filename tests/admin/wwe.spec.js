const { browser, test, expect } = require('@playwright/test');
const fs = require('fs')
const path = require('path');
test.describe('Automation - Working With Elements', () => {

    test('Playwright Test Case - upload file', async ({ page }) => {

        await page.goto('https://the-internet.herokuapp.com/upload')

        await page.locator('#file-upload').setInputFiles('./testData/files/24. Example Defect.png')

        //Import 

        await page.locator('#file-submit').click()

        await page.waitForTimeout(5000)

    })


    test.skip('Playwright Test Case - upload file example 2 ', async ({ page }) => {

        await page.goto('https://cgi-lib.berkeley.edu/ex/fup.html')

        await page.locator('//input[@name="upfile"]').setInputFiles('./testData/files/B26 Automation - Playwright.txt')

        await page.locator('//input[@type="submit"]').click()
        await expect(page.getByText("The file's contents are:")).toBeVisible()

        await page.waitForTimeout(5000)

    })

    test('Upload Multiple files and assert', async ({ page }) => {

        await page.goto('http://blueimp.github.io/jQuery-File-Upload/')

        // await page.setInputFiles('input[type="file"]', [
        //     './testData/files/21. Test Design techniques.png',
        //     './testData/files/24. Example Defect.png'
        // ])

        await page.locator('input[type="file"]').setInputFiles(['./testData/files/21. Test Design techniques.png', './testData/files/24. Example Defect.png'])

        await expect(page.locator('p.name').nth(0)).toHaveText('21. Test Design techniques.png')
        await expect(page.locator('p.name').nth(1)).toHaveText('24. Example Defect.png')

        await page.waitForTimeout(5000)

    })

    test('Download a Single file and assert', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/download')

        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.locator('text=test.jpg').click()
        ]);

        const suggestedFileName = download.suggestedFilename()
        const filePath = 'downloads/' + suggestedFileName
        await download.saveAs(filePath)
        expect(fs.existsSync(filePath)).toBeTruthy()
    })

    test('Download Multiple files and assert', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/download')
        const fileNames = ["Cat.jpg", "data-flow.png"]


        for (const fileName of fileNames) {
            const [download] = await Promise.all([
                page.waitForEvent('download'),
                page.locator(`text=${fileName}`).click()
            ]);
            const suggestedFileName = download.suggestedFilename()
            const filePath = 'downloads/' + suggestedFileName
            await download.saveAs(filePath)
            expect(fs.existsSync(filePath)).toBeTruthy()
        }
    })

    test('Direct Download and assert', async ({ page }) => {

        // Define the image URL
        const imageUrl = 'https://cricfit.com/wp-content/uploads/2024/01/20240113_170206.jpg';

        // Fetch the image using Playwright's request API
        const response = await page.request.get(imageUrl);

        // Ensure the response is OK
        if (response.ok()) {
            // Get the image buffer
            const buffer = await response.body();

            // Define the 'downloads' folder path inside your project folder
            const downloadsFolder = path.join(__dirname + "/../..", 'downloads');
            // Check if 'downloads' folder exists, if not, create it
            if (!fs.existsSync(downloadsFolder)) {
                fs.mkdirSync(downloadsFolder, { recursive: true });
            }

            // Define the file name and path to save the image inside the 'downloads' folder
            const savePath = path.join(downloadsFolder, 'virat.jpg');

            // Write the buffer to a file
            fs.writeFileSync(savePath, buffer);
            console.log(`Image downloaded successfully and saved to ${savePath}`);
        } else {
            console.log(`Failed to download the image. Status code: ${response.status()}`);
        }
    })


    test('scroll to specific element', async ({ page }) => {

        await page.goto("https://www.imdb.com/chart/top/");

        // let dJanagoMovieLink = await page.locator("//h3[contains(text(),'128. Hamilton')]");

        // await dJanagoMovieLink.scrollIntoViewIfNeeded();

        await page.locator("//h3[contains(text(),'128. Hamilton')]").scrollIntoViewIfNeeded()

        //await dJanagoMovieLink.click();

        await page.locator("//h3[contains(text(),'128. Hamilton')]").click()

        expect(await page.locator('h1 span').textContent()).toEqual('Hamilton')

    });

    test('Working with Iframes', async ({ page }) => {

      await page.goto('https://jqueryui.com/checkboxradio/')
      const checkbox = await page.frameLocator('iframe[class="demo-frame"]').locator('label[for="checkbox-1"]')

      await checkbox.click()
      await page.waitForTimeout(5000)
 
    })

    test('Working with Shadow DOM', async ({ page }) => {

        await page.goto('http://watir.com/examples/shadow_dom.html')
        
        await page.locator('input[type="text"]').fill("Raju")
        await page.waitForTimeout(5000)
   
      })

      test.only('Working with Shadow DOM2', async ({ page }) => {

      await page.goto('https://books-pwakit.appspot.com/')
      await page.locator('#input').fill('Science')
      await page.keyboard.press('Enter')
      await expect(page.locator('text=Before Big Science234')).toBeVisible()

      await page.waitForTimeout(5000)
      //await page.reload()

      await page.keyboard.press('F5')
      })


      


})
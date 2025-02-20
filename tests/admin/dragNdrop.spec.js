const { browser, test, expect, chromium } = require('@playwright/test');

test.describe('Automation - Working With Elements', () => {

  test('Playwright Test Case - Understanding Drag and Drop', async ({ page }) => {

    // Go to the page
    await page.goto('https://kitchen.applitools.com/ingredients/drag-and-drop');

    // await page.locator('#menu-fried-chicken').dragTo(page.locator('#plate-items'))

    // await page.locator('#menu-hamburger').dragTo(page.locator('#plate-items'))

    // await page.waitForTimeout(5000)

    const sourceFriedChicken = await page.locator('#menu-fried-chicken');
    const sourceHamburger = await page.locator('#menu-hamburger');
    const sourceIceCream = await page.locator('#menu-ice-cream');

    const targetPlateItems = await page.locator('#plate-items');

    await sourceFriedChicken.dragTo(targetPlateItems);
    await sourceHamburger.dragTo(targetPlateItems);
    await sourceIceCream.dragTo(targetPlateItems);
    await page.waitForTimeout(5000)

  })


  test('handle tabs', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');

    const [newTab] = await Promise.all([
      page.waitForEvent('popup'),
      page.click('//a[normalize-space()="Click Here"]')
    ]);

    // console.log(newTab.url());
    // expect(await newTab.title()).toBe('New Window');

    const textvalue = await newTab.locator('.example>h3').textContent();

    console.log("Text on new page:", textvalue);

    await page.waitForTimeout(5000)
  });


  test('handle tabs -example 2***', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/windows');

    // await page.goBack() // history back page 

    // await page.goForward() // history forward 

    await page.click('//a[normalize-space()="Click Here"]')

    const newPagePromise = page.waitForEvent('popup');
    const newPage = await newPagePromise;
    await newPage.waitForLoadState();

    const textvalue = await newPage.locator('.example>h3').textContent();

    console.log("Text on new page:", textvalue);


    await page.waitForTimeout(5000)
  });

  test('Links -example ', async ({ page }) => {

    await page.goto('https://trello.com/')

    await page.click("//a[text()='Log in']")
    await page.getByTestId('username').fill("rajutester2673@gmail.com")


  })

  test('Links -example2 ', async ({ page }) => {

    await page.goto('https://www.wikipedia.org/')

    await page.click('[data-jsl10n="commons.name"]')
    await page.waitForTimeout(5000)

    await expect(page).toHaveURL('https://commons.wikimedia.org/wiki/Main_Page')
    await page.goBack() //

    await page.locator("//span[text()='Wikivoyage']").click()
    await page.waitForTimeout(5000)
    await expect(page).toHaveURL('https://www.wikivoyage.org')
    await page.goBack()

    await page.waitForTimeout(5000)

    await page.goForward()

  })

  test.only("browse context test", async () => {
    const browser = await chromium.launch({ headless: false });
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();


    const page = await context1.newPage();
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    await page.locator('input[name="username"]').fill("Admin")
    await page.locator("input[type='password']").fill("admin123")
    await page.locator("input[type='password']").press("Enter")

    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')



    const page2 = await context2.newPage();
    await page2.goto('https://opensource-demo.orangehrmlive.com/');

    await page2.goto('https://opensource-demo.orangehrmlive.com/');
    await page2.locator('input[name="username"]').fill("rajug")
    await page2.locator("input[type='password']").fill("Raju@1234")
    await page2.locator("input[type='password']").press("Enter")

    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')



    console.log(browser.contexts().length);

    await page.waitForTimeout(10000)

    await browser.close();
  });

})
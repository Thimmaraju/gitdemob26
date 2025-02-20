const { browser, test, expect } = require('@playwright/test');

test("Click one of the elements that is visible out of two", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/disappearing_elements");

    const contactus = page.getByRole("link", { name: "Contact Us" });
    const portfolio = page.getByRole("link", { name: "Portfolio" });
    const gallery = page.getByRole("link", { name: "Gallery" });

    if (await gallery.isVisible()) {
        await gallery.click();
        console.log("clicked on Gallery")
    } else if (await portfolio.isVisible()) {
        await portfolio.click();
        console.log("clicked on Portfolio")
    }

    await expect(page).toHaveURL(/.*gallery|.*portfolio/);
});

test("Click one of the elements that is present out of two", async ({ page }) => {

    await page.goto("https://the-internet.herokuapp.com/disappearing_elements");

    const contactus = page.getByRole("link", { name: "Contact Us" });
    const portfolio = page.getByRole("link", { name: "Portfolio" });

    if (await contactus) {
        await contactus.click();
        console.log("contactus was present")
    } else if (await portfolio) {
        await portfolio.click();
    }

    await expect(page).toHaveURL(/.*contact-us|.*portfolio/);
});


test("Based on BrowserName skip", async ({ page, browserName }) => {

    test.skip(browserName == 'chromium', 'Only relevant for firefox');

    await page.goto("https://the-internet.herokuapp.com/disappearing_elements");


})

test("Based on BrowserName run different script", async ({ page, browserName }) => {


    switch (browserName) {
        case "chromium":

            await page.goto("https://www.flipkart.com/");

            break;

        case "firefox":

            await page.goto("https://www.amazon.in/");

            break;
        case "webkit":

            await page.goto("https://www.myntra.com/");

            break;

    }


})


test('page screenshot', async ({ page }) => {
 await page.goto('https://www.flipkart.com/')

 await page.waitForTimeout(3000)
 await page.screenshot({ path:'tests/screenshots/HomePage.png'})

 //await page.screenshot({ path:'tests/screenshots/'+Date.now()+'HomePage.png'})
});

test('Full page screenshot', async ({ page }) => {
    await page.goto('https://www.flipkart.com/')
    await page.waitForTimeout(3000)
    await page.screenshot({ path:'tests/screenshots/'+Date.now()+'FullPage.png',fullPage:true})
});

test.only('Element screenshot', async ({ page }) => {
    await page.goto('https://www.flipkart.com/')
    await page.waitForTimeout(3000)
    await page.locator('div[class="_3bzdSa"]').screenshot({ path:'tests/screenshots/'+Date.now()+'.png'})
});
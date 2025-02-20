const { test, expect } = require('@playwright/test');

test('Working with check box', async ({ page }) => {

    await page.goto('https://register.rediff.com/register/register.php?FormName=user_details')

    await page.locator('//input[@type="checkbox"]').check()

    await expect(page.locator('//input[@type="checkbox"]')).toBeChecked()

    await page.locator('//input[@type="checkbox"]').uncheck()

    await expect(page.locator('//input[@type="checkbox"]')).not.toBeChecked()

    const ischecked = await page.locator('//input[@type="checkbox"]').isChecked()

    console.log(ischecked)

    // if(!ischecked){

    //     await page.locator('//input[@type="checkbox"]').check()

    // }

});

test('Working with check box - example 2', async ({ page }) => {

    await page.goto('/web/index.php/auth/login');

    await page.locator("//input[@name='username']").fill("Admin")
    await page.locator("input[type='password']").fill("admin123")
    await page.locator("button[type='submit']").click()

    await page.locator('//a[@href="/web/index.php/pim/viewPimModule"]').click()

    const checkBoxes = ["input[value='3']", "input[value='4']", "input[value='8']"] // specific checkboxes 


    for (let checkbox of checkBoxes) {
        const isChecked = await page.locator(checkbox).isChecked();

        // Check the checkbox if it's not already checked
        if (!isChecked) {
            await page.locator(checkbox).check({ force: true });
        }
    }

    await page.waitForTimeout(5000)

})

test('Working with check box - example 3', async ({ page }) => {

    await page.goto('https://demo.guru99.com/test/radio.html');


    const checkBoxes = await page.$$('[type="checkbox"]');

    for (let checkbox of checkBoxes) {
        const isChecked = await checkbox.isChecked();

        // Check the checkbox if it's not already checked
        if (!isChecked) {
            await checkbox.check({ force: true });
        }
    }

    await page.waitForTimeout(5000)

})

// $$ - will save all matxhing locators to a array
// $  - will work with first matching element 

test('Working with Radio button - example', async ({ page }) => {

    await page.goto('https://register.rediff.com/register/register.php?FormName=user_details')
    await expect(page.locator('input[value="m"]')).toBeChecked()
    await expect(page.locator('input[value="f"]')).not.toBeChecked()

    await page.locator('input[value="f"]').check()

    await expect(page.locator('input[value="m"]')).not.toBeChecked()
    await expect(page.locator('input[value="f"]')).toBeChecked()

    const isChecked = await page.locator('input[value="f"]').isChecked()

    console.log(isChecked)

    await page.waitForTimeout(5000)

})

test.only("Working with text", async ({ page }) => {

    await page.goto("https://www.flipkart.com/")

    //await expect(page.locator('//a[@aria-label="Mobiles"]/div/div/span/span')).toHaveText("Raju")

    // const textvalue = await page.locator('//a[@aria-label="Mobiles"]/div/div/span/span').textContent()

    //  console.log(textvalue)

    //  const values = await page.locator('//a[@class="_1ch8e_"]/div/div/span/span').allTextContents()

    // for(let i of values){
    //     console.log(i)
    // }

    const textvalue = await page.locator('//a[@aria-label="Mobiles"]/div/div/span/span').innerText()

    console.log(textvalue)

    const values = await page.locator('//a[@class="_1ch8e_"]/div/div/span/span').allInnerTexts()

    for (let i of values) {
        console.log(i)
    }
})


test("Working with dropdowns - example", async ({ page }) => {

    await page.goto('https://register.rediff.com/register/register.php?FormName=user_details')

    //text

   // await page.locator('#country').selectOption("Austria")
    //or 
   // await page.locator('#country').selectOption({label : "Austria"})

    //Value 

    //await page.locator('#country').selectOption("8")
    //or
   // await page.locator('#country').selectOption({value : "9"})

    //index

    await page.locator('#country').selectOption({index : 15})

    await expect(page.locator("#country>option")).toHaveCount(248)


    // const options = await page.$$('#country>option')

    // console.log(options.length)

     const dropdown = page.locator('#country'); // Use the correct selector for the dropdown

    // // Get all option elements within the dropdown
    const options = await dropdown.locator('option').allTextContents();
    console.log(options)
    await page.waitForTimeout(5000)

})
const { test, expect } = require('@playwright/test');

let page

test.beforeAll(async () => {

    console.log("Before starting")
})

test.afterAll(async () => {

    console.log("At the end once")
})


test.beforeEach(async ({ browser }) => {

    // page = await browser.newPage()
    // await page.goto("https://www.google.com/");
    console.log("before each")
})

test.afterEach(async () => {

    console.log("after each")
})

test('Test 1', async () => {

    console.log("test 1")

});

test('Test 2', async () => {

    console.log("text2 ")

})

test('Test 3', async () => {

    console.log("text3 ")

})
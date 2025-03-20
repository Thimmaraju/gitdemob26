const { test, expect } = require('@playwright/test');


//Based on condition to skip 

test('Test 2', async ({browserName}) => {


    if(browserName === "Google Chrome"){

        test.skip()
    }
    console.log("test 2")

});
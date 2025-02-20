
const { test, expect } = require('@playwright/test');

test.beforeAll(async () => {

    console.log("Before starting")
})

test.afterAll(async () => {

    console.log("At the end once")
})

test.afterEach(async () => {

    console.log("after each")
})

test.beforeEach(async () => {

    console.log("Before each")
})

test.describe("Group 1", async () => {
    test('Test 1',{ tag: "@smoke"}, async () => {

        test.fixme()

        console.log("test 1")

    });

    test('Test 2', { tag: "@regression"}, async () => {

        console.log("test 2")

    });

})

test.describe("Group 2", async () => {


    test('Test 3', async () => {

        console.log("test 3")

    });

    test('Test 4', async () => {

        test.fail()

        expect(2).toBe(6)
        console.log("test 4")

    });

})

// test.describe("Group 1", async () => {

//     test.describe("sub Group 1", async () => {
//         test('Test 1', async () => {

//             console.log("test 1")

//         });

//         test('Test 2', async () => {

//             console.log("test 2")

//         });

//     })

//     test.describe("Sub Group 2", async () => {


//         test('Test 3', async () => {

//             console.log("test 3")

//         });

//         test('Test 4', async () => {

//             console.log("test 4")

//         });

//     })
// })
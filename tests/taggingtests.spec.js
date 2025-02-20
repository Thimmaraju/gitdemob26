const { test, expect } = require('@playwright/test');

test('Test 1', {
    tag: '@smoke',
  }, async () => {

    console.log("test 1")

});

test('Test 2',{
    tag: ['@smoke','@regression']
  }, async () => {

    console.log("test 2")

});

test('Test 3',{
    tag: '@regression',
  }, async () => {

    console.log("test 3")

});

test('Test 4', async () => {

    console.log("test 3")

});
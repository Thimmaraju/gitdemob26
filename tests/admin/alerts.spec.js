const { test, expect } = require('@playwright/test');

test.describe('Automation - Working with Alerts', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");
  });

  test('Playwright Test Case - Simple Alert', async ({ page }) => {
    // Trigger the alert
    page.locator('text=Click for JS Alert').click();
    await page.waitForTimeout(5000)

    // Wait for the alert and verify its message
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept(); // Accept the alert
    });
    await page.waitForTimeout(5000)

  });

  test('Playwright Test Case - test Confirm Alert - OK', async ({ page }) => {
    // Trigger the confirm alert
    page.locator('text=Click for JS Confirm').click();
    // Wait for the confirm dialog and accept it (Click OK)
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.accept();
    });
    await page.waitForTimeout(5000)
  });

  test('Playwright Test Case - test Confirm Alert - Cancel', async ({ page }) => {
    // Trigger the confirm alert
    page.locator('text=Click for JS Confirm').click();

    // Wait for the confirm dialog and cancel it (Click Cancel)
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('confirm');
      await dialog.dismiss();
    });
    await page.waitForTimeout(5000)
  });

  test.only('Playwright Test Case - test prompt Alert - Ok', async ({ page }) => {
    // Trigger the prompt alert
    page.locator('text=Click for JS Prompt').click();

    // Intercept the prompt and return a response
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      await dialog.accept('Nagalakshmi'); // Enter the value and accept
    });
    await page.waitForTimeout(5000)
  });

  test('Playwright Test Case - test prompt Alert - Cancel', async ({ page }) => {
    // Trigger the prompt alert
    page.locator('text=Click for JS Prompt').click();

    // Intercept the prompt and cancel it
    page.on('dialog', async dialog => {
      expect(dialog.type()).toBe('prompt');
      await dialog.dismiss(); // Dismiss the prompt (click Cancel)
    });

    await page.waitForTimeout(5000)
  });

});


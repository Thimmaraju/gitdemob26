const { test, expect } = require('@playwright/test');

test.describe('Automation - Working With Drag and Drop', () => {
  
  test('Playwright Test Case - Understanding Drag and Drop', async ({ page }) => {
    
    // Go to the page
    await page.goto('https://kitchen.applitools.com/ingredients/drag-and-drop');
    
    // Wait for the page to load and elements to be visible
    await page.waitForTimeout(5000);

    // Locators for drag source and target elements
    const sourceFriedChicken = await page.locator('#menu-fried-chicken');
    const sourceHamburger = await page.locator('#menu-hamburger');
    const sourceIceCream = await page.locator('#menu-ice-cream');
    const targetPlateItems = await page.locator('#plate-items');
    
    // Get the bounding boxes for each source and target elements// get x y corordinates 
    const boxFriedChicken = await sourceFriedChicken.boundingBox();
    const boxHamburger = await sourceHamburger.boundingBox();
    const boxIceCream = await sourceIceCream.boundingBox();
    const boxPlateItems = await targetPlateItems.boundingBox();

    // Simulate dragging Fried Chicken to Plate Items
    await page.mouse.move(boxFriedChicken.x + boxFriedChicken.width / 2, boxFriedChicken.y + boxFriedChicken.height / 2);
    await page.mouse.down();
    await page.mouse.move(boxPlateItems.x + boxPlateItems.width / 2, boxPlateItems.y + boxPlateItems.height / 2);
    await page.mouse.up();
    
    // Simulate dragging Hamburger to Plate Items
    await page.mouse.move(boxHamburger.x + boxHamburger.width / 2, boxHamburger.y + boxHamburger.height / 2);
    await page.mouse.down();
    await page.mouse.move(boxPlateItems.x + boxPlateItems.width / 2, boxPlateItems.y + boxPlateItems.height / 2);
    await page.mouse.up();

    // Simulate dragging Ice Cream to Plate Items
    await page.mouse.move(boxIceCream.x + boxIceCream.width / 2, boxIceCream.y + boxIceCream.height / 2);
    await page.mouse.down();
    await page.mouse.move(boxPlateItems.x + boxPlateItems.width / 2, boxPlateItems.y + boxPlateItems.height / 2);
    await page.mouse.up();

    // Optionally, you can add assertions to verify the result of the drag-and-drop action.
    // Example: Verify that the target plate contains items (you may need to adjust this based on the DOM).
    
    await page.waitForTimeout(5000); // You can adjust the wait or use an appropriate wait condition here
  });

});

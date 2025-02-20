import { test as setup, expect } from "@playwright/test";
import fs from "fs";

setup("authenticate", async ({ page }) => {
  await page.goto('/web/index.php/auth/login');
  await page.locator('input[name="username"]').fill("admin")
  await page.locator("input[type='password']").fill("admin123")
  await page.locator("input[type='password']").press("Enter")
  await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
  // return storage and session data
  await page.context().storageState()
  // write storage and session data to disk
  await page.context().storageState({ path: ".auth/user.json" })
});
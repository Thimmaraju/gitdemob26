import { test, expect } from "@playwright/test";


test.describe('Validate Orange HRM Login functionality with SessionStorage', () => {


  test('Validate Add job title', async ({ page }) => {
    await page.goto('/web/index.php/admin/saveJobTitle');
    let r = Math.random().toString(36).substring(7);
    await page.locator('input.oxd-input.oxd-input--active').nth(1).fill('Senior Analyst' + r);
    await page.locator('button[type="submit"]').click();
  });


  test('Validate add pay grade', async ({ page }) => {
    await page.goto('/web/index.php/admin/payGrade');
    let r = Math.random().toString(36).substring(7);
    await page.locator('input.oxd-input.oxd-input--active').nth(1).fill('Grade 6' + r);
    await page.locator('button[type="submit"]').click();
    await page.waitForTimeout(3000);
  });

  test('Validate employment status', async ({ page }) => {
    await page.goto('/web/index.php/admin/saveEmploymentStatus');
    await page.waitForTimeout(3000);
    await page.locator('input.oxd-input.oxd-input--active').nth(1).fill('Full time');
    await page.locator('button[type="submit"]').click();
  });

  test('Validate Employee report', async ({ page }) => {
    await page.goto('/web/index.php/time/displayProjectReportCriteria');
  });

  test('Attendance Total Summary Report', async ({ page }) => {
    await page.goto('/web/index.php/time/displayAttendanceSummaryReportCriteria');
    await page.waitForTimeout(3000);
  });

  test('Add vacancy', async ({ page }) => {
    await page.goto('/web/index.php/recruitment/addJobVacancy');
    await page.waitForTimeout(3000);
  });

});
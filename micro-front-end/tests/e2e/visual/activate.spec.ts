import { test, expect } from '@playwright/test';

test.describe('Activate Page Visual Tests', () => {
  test('should match activate page screenshot', async ({ page }) => {
    await page.goto('/activate');
    
    // Wait for fonts to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Hide cursor and any dynamic elements
    await page.addStyleTag({
      content: `
        * { cursor: none !important; }
        .cursor { display: none !important; }
        .blinking { animation: none !important; }
      `
    });
    
    // Take screenshot and compare
    await expect(page).toHaveScreenshot('activate-page.png', {
      fullPage: true,
      threshold: 0.005,
    });
  });

  test('should show correct stepper state', async ({ page }) => {
    await page.goto('/activate');
    await page.waitForLoadState('networkidle');
    
    // Check if stepper is visible and correct
    const stepper = page.locator('.MuiStepper-root');
    await expect(stepper).toBeVisible();
    
    // Hide cursor
    await page.addStyleTag({
      content: `* { cursor: none !important; }`
    });
    
    await expect(page).toHaveScreenshot('activate-stepper.png', {
      threshold: 0.005,
    });
  });
});
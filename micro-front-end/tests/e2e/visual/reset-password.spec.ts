import { test, expect } from '@playwright/test';

test.describe('Reset Password Page Visual Tests', () => {
  test('should match reset password page screenshot', async ({ page }) => {
    await page.goto('/reset-password');
    
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
    await expect(page).toHaveScreenshot('reset-password-page.png', {
      fullPage: true,
      threshold: 0.005,
    });
  });

  test('should show warning message correctly', async ({ page }) => {
    await page.goto('/reset-password');
    await page.waitForLoadState('networkidle');
    
    // Check if warning alert is visible
    const warningAlert = page.locator('.MuiAlert-root');
    await expect(warningAlert).toBeVisible();
    
    // Hide cursor
    await page.addStyleTag({
      content: `* { cursor: none !important; }`
    });
    
    await expect(page).toHaveScreenshot('reset-password-warning.png', {
      threshold: 0.005,
    });
  });
});
import { test, expect } from '@playwright/test';

test.describe('Unlock Account Page Visual Tests', () => {
  test('should match unlock account page screenshot', async ({ page }) => {
    await page.goto('/unlock-account');
    
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
    await expect(page).toHaveScreenshot('unlock-account-page.png', {
      fullPage: true,
      threshold: 0.005,
    });
  });

  test('should show lock icon and form correctly', async ({ page }) => {
    await page.goto('/unlock-account');
    await page.waitForLoadState('networkidle');
    
    // Check if lock icon is visible
    const lockIcon = page.locator('[data-testid="LockIcon"]');
    await expect(lockIcon).toBeVisible();
    
    // Hide cursor
    await page.addStyleTag({
      content: `* { cursor: none !important; }`
    });
    
    await expect(page).toHaveScreenshot('unlock-account-form.png', {
      threshold: 0.005,
    });
  });
});
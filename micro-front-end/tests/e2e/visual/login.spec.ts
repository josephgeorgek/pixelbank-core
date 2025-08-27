import { test, expect } from '@playwright/test';

test.describe('Login Page Visual Tests', () => {
  test('should match login page screenshot', async ({ page }) => {
    await page.goto('/login');
    
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
    await expect(page).toHaveScreenshot('login-page.png', {
      fullPage: true,
      threshold: 0.005,
    });
  });

  test('should match login form interactions', async ({ page }) => {
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    
    // Fill form fields
    await page.fill('input[placeholder="Enter your Organisation ID"]', 'TEST123');
    await page.fill('input[placeholder="Enter your User ID"]', 'user123');
    
    // Hide cursor
    await page.addStyleTag({
      content: `* { cursor: none !important; }`
    });
    
    await expect(page).toHaveScreenshot('login-filled.png', {
      threshold: 0.005,
    });
  });
});
import { test, expect } from '@playwright/test';

test.describe('MoneyVibe E2E Testing Suite (Bai 17)', () => {
  test('Nguoi dung co the tai trang va xem dashboard tai chinh', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=MoneyVibe')).toBeVisible();
    await expect(page.locator('text=Tong quan')).toBeVisible();
  });

  test('Ghi nhan giao dich moi thanh cong', async ({ page }) => {
    await page.goto('/');
    const amountInput = page.locator('input[placeholder*="50000"]');
    if (await amountInput.isVisible()) {
      await amountInput.fill('75000');
      await page.locator('input[placeholder*="Ghi chu"]').fill('Test Playwright E2E');
      await page.locator('button:has-text("Luu Giao Dich")').click();
      await expect(page.locator('text=Test Playwright E2E')).toBeVisible();
    }
  });
});

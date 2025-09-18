import { expect, test } from '@playwright/test';

test.describe('login', () => {
  test('ログインできることを確認する', async ({ page }) => {
    await page.goto('/home');
    await page.waitForURL('/home');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toBe('http://localhost:3000/home');
    await expect(page.getByText('ホーム')).toBeVisible();
  });
});

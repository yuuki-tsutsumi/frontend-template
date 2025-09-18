import { test, expect } from '../utils/mock.js';

test('タイトルなどがレンダリングされている', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  await expect(page.getByRole('heading', { name: 'ホーム' })).toBeVisible();
});

test('AppAdminで各ボタンが正しくレンダリングされている', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  const homeButton = page.locator('[data-testid="HomeIcon"]');
  const inquiryButton = page.locator('[data-testid=MailOutlineIcon]');
  const logoutButton = page.locator('[data-testid="LogoutIcon"]');
  const settingButton = page.locator('[data-testid="SettingsIcon"]');
  await expect(inquiryButton).toBeVisible();
  await expect(homeButton).toBeVisible();
  await expect(logoutButton).toBeVisible();
  await expect(settingButton).not.toBeVisible();
});

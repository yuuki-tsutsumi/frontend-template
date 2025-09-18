import { expect, test } from '@playwright/test';
import { logout } from '../utils/auth';

test.describe('logout', () => {
  test('ログアウトできて認証情報が破棄されていることを確認する', async ({
    page,
  }) => {
    // ログアウト前に認証情報があることを確認
    const localStorageBefore = await page.context().storageState();
    expect(localStorageBefore.origins[0].localStorage).toBeDefined();

    // ログイン画面に遷移することを確認
    await page.goto('/home');
    await logout(page);
    expect(page.url()).toBe('http://localhost:3000/login');
    await expect(page.locator('h1', { hasText: 'ログイン' })).toBeVisible();

    // ログアウト後に認証情報が破棄されていることを確認
    const localStorageAfter = await page.context().storageState();
    expect(localStorageAfter.origins[0]).not.toBeDefined();
  });
});

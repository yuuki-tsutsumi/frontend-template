import { Page } from '@playwright/test';

export const login = async ({
  page,
  userId,
  password,
}: {
  page: Page;
  userId: string;
  password: string;
}) => {
  await page.goto('/login', { waitUntil: 'domcontentloaded' });
  await page.waitForURL(/\/login/, { timeout: 10000 });

  const userPlaceholder = page.locator('input[name="username"]');
  const passwordPlaceholder = page.locator('input[name="password"]');
  const loginButton = page.getByRole('button', { name: '次へ' });

  await userPlaceholder.waitFor({ state: 'visible', timeout: 5000 });
  await passwordPlaceholder.waitFor({ state: 'visible', timeout: 5000 });
  await loginButton.waitFor({ state: 'attached', timeout: 5000 });

  await userPlaceholder.fill(userId);
  await passwordPlaceholder.fill(password);

  await Promise.all([
    page.waitForNavigation({ url: '/home', waitUntil: 'load', timeout: 10000 }),
    loginButton.click(),
  ]);
};

export const logout = async (page: Page) => {
  const logoutButton = page.locator('[data-testid="LogoutIcon"]');
  await logoutButton.click();
  const confirmButton = page.locator('button:has-text("ログアウト")');
  await confirmButton.click();
  await page.waitForURL('/login');
};

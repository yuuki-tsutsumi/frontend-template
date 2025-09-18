import { test as setup } from '@playwright/test';

import { STORAGE_STATE } from '../../playwright.config';
import { login } from '../utils/auth';

setup('setup', async ({ page }) => {
  const userId = process.env.LOGIN_TEST_USERID || '';
  const password = process.env.LOGIN_TEST_PASSWORD || '';

  await login({ page, userId, password });
  await page.context().storageState({ path: STORAGE_STATE });
});

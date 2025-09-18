import { renderHook, waitFor } from '@testing-library/react';
import { useAuthRedirect } from './auth';
import { useRouter } from 'next/router';
import { userPool } from '@/infra/aws/cognito';
import { beforeEach, describe, expect, test, vi } from 'vitest';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/infra/aws/cognito', () => ({
  userPool: {
    getCurrentUser: vi.fn(),
  },
}));

describe('useAuthRedirect', () => {
  const push = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({ push });
  });

  test('認証されていない場合、ログインページにリダイレクトされる', async () => {
    // arrange
    (userPool.getCurrentUser as ReturnType<typeof vi.fn>).mockReturnValue(null);

    // act
    renderHook(() => useAuthRedirect());

    // assert
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/login');
    });
  });

  test('認証されている場合、リダイレクトされない', async () => {
    // arrange
    const getSessionMock = vi.fn((callback) => {
      callback(null, { isValid: () => true });
    });
    (userPool.getCurrentUser as ReturnType<typeof vi.fn>).mockReturnValue({
      getSession: getSessionMock,
    });

    // act
    renderHook(() => useAuthRedirect());

    // assert
    await waitFor(() => {
      expect(push).not.toHaveBeenCalled();
    });
  });

  test('セッションエラーの場合、ログインページにリダイレクトされる', async () => {
    // arrange
    const getSessionMock = vi.fn((callback) => {
      callback(new Error('error'), null);
    });
    (userPool.getCurrentUser as ReturnType<typeof vi.fn>).mockReturnValue({
      getSession: getSessionMock,
    });

    // act
    renderHook(() => useAuthRedirect());

    // assert
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/login');
    });
  });
});

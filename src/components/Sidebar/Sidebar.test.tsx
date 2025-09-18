import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Sidebar } from './Sidebar';
import { useRouter } from 'next/router';
import { Role } from '@/entity/user';
import { useAuth } from '@/providers/AuthProvider';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/providers/AuthProvider', () => ({
  useAuth: vi.fn(() => {
    return {
      role: Role.AppAdmin,
    };
  }),
}));

describe('Sidebar Component', () => {
  const user = userEvent.setup();
  const replace = vi.fn();
  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as ReturnType<typeof vi.fn>).mockReturnValue({ replace });
  });

  it('AppAdminの場合, ボタンが3個表出する', () => {
    // arrange
    render(<Sidebar />);
    const buttons = screen.getAllByRole('button');
    const links = screen.getAllByRole('link');

    // assert
    expect(buttons.length).toBe(3);
    // ログアウトボタンはモーダルの中にリンクがあるので除外
    expect(links.length).toBe(2);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/',
      '/inquiry',
    ]);
  });

  it('OrgAdminの場合, ボタンが4個表出する', () => {
    // arrange
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      role: Role.OrgAdmin,
    });
    render(<Sidebar />);
    const buttons = screen.getAllByRole('button');
    const links = screen.getAllByRole('link');

    // assert
    expect(buttons.length).toBe(4);
    expect(links.length).toBe(3);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/',
      '/inquiry',
      '/settings',
    ]);
  });

  it('Memberの場合, ボタンが3個表出する', () => {
    // arrange
    (useAuth as ReturnType<typeof vi.fn>).mockReturnValue({
      role: Role.Member,
    });
    render(<Sidebar />);
    const buttons = screen.getAllByRole('button');
    const links = screen.getAllByRole('link');

    // assert
    expect(buttons.length).toBe(3);
    expect(links.length).toBe(2);
    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/',
      '/inquiry',
    ]);
  });

  it('ログアウトボタンを押すとモーダルが表出し, ログアウトする', async () => {
    // arrange
    render(<Sidebar />);
    const logoutButton = screen.getByTestId('LogoutIcon');

    // act
    await user.click(logoutButton);
    const modalLogoutButton = screen.getByText('ログアウト');
    await user.click(modalLogoutButton);

    // assert
    expect(replace).toHaveBeenCalledWith('/login');
  });
});

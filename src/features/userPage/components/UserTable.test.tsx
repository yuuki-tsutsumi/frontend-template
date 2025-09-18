import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import UserTable from './UserTable';
import { getRoleName, Role, UserRow } from '@/entity/user';

describe('UserTable Component', () => {
  const mockUsers: UserRow[] = [
    {
      id: 1,
      name: 'tanaka_taro',
      email: 'taro@example.com',
      role: getRoleName(Role.OrgAdmin),
    },
    {
      id: 2,
      name: 'suzuki_ichiro',
      email: 'ichiro@example.com',
      role: getRoleName(Role.Member),
    },
  ];
  it('ユーザー一覧が表示される', () => {
    // arrange
    render(<UserTable rows={mockUsers} onOpenMenu={() => {}} />);

    // assert
    expect(screen.getByText('tanaka_taro')).toBeInTheDocument();
    expect(screen.getByText('taro@example.com')).toBeInTheDocument();
    expect(screen.getByText('管理者')).toBeInTheDocument();
    expect(screen.getByText('suzuki_ichiro')).toBeInTheDocument();
    expect(screen.getByText('ichiro@example.com')).toBeInTheDocument();
    expect(screen.getByText('メンバ')).toBeInTheDocument();
  });
});

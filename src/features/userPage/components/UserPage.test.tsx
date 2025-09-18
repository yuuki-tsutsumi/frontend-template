import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import UserPage from './UserPage';
import { getRoleName, Role, UserRow } from '@/entity/user';

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

vi.mock('./UserTable', () => ({
  __esModule: true,
  default: ({
    rows,
    onOpenMenu,
  }: {
    rows: UserRow[];
    onOpenMenu: (e: React.MouseEvent<HTMLButtonElement>, user: UserRow) => void;
  }) => (
    <div>
      {rows.map((user: UserRow) => (
        <div key={user.id}>
          <span>{user.name}</span>
          <button onClick={(e) => onOpenMenu(e, user)}>操作</button>
        </div>
      ))}
    </div>
  ),
}));

describe('UserPage Component', () => {
  const user = userEvent.setup();
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('正しくレンダリングされている', () => {
    // arrange
    render(<UserPage users={mockUsers} />);

    // assert
    expect(screen.getByText('ユーザ管理')).toBeInTheDocument();
    expect(screen.getByText('tanaka_taro')).toBeInTheDocument();
    expect(screen.getByText('suzuki_ichiro')).toBeInTheDocument();
  });

  it('削除ボタンを押すとconsole.logが呼ばれる', async () => {
    // arrange
    render(<UserPage users={mockUsers} />);
    const buttons = screen.getAllByText('操作');

    // act
    await user.click(buttons[0]);
    expect(screen.getByText('削除する')).toBeInTheDocument();
    await user.click(screen.getByText('削除する'));

    // assert
    expect(console.log).toHaveBeenCalledWith('Deleting user: tanaka_taro');
  });
});

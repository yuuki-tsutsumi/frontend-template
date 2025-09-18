import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SettingSideList } from './SettingSideList';
import { usePathname } from 'next/navigation';

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

describe('SettingSideList Component', () => {
  beforeEach(() => {
    (usePathname as ReturnType<typeof vi.fn>).mockReturnValue(
      '/settings/requests',
    );
  });

  it('正しくレンダリングされている', () => {
    // arrange
    render(<SettingSideList sideListWidth={250} />);

    // assert
    expect(screen.getByText('管理者設定')).toBeInTheDocument();
  });
});

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BaseSnackbar } from './BaseSnackbar';

describe('BaseSnackbar Component', () => {
  const user = userEvent.setup();
  const testProps = {
    open: true,
    setOpen: vi.fn(),
    message: 'テスト',
  };

  it('true時にメッセージが表示されている', async () => {
    // arrange
    render(<BaseSnackbar {...testProps} />);
    const openButton = screen.getByText('テスト');

    // assert
    expect(openButton).toBeInTheDocument();
  });

  it('閉じるボタン押下時にsetOpenが呼ばれる', async () => {
    // arrange
    render(<BaseSnackbar {...testProps} />);
    const closeButton = screen.getByRole('button', { name: 'Close' });

    // act
    await user.click(closeButton);

    // assert
    expect(testProps.setOpen).toHaveBeenCalledTimes(1);
  });
});

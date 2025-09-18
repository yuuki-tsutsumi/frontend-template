import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { BaseModal } from './BaseModal';

describe('BaseModal Component', () => {
  const mockHandleExecute = vi.fn();
  const user = userEvent.setup();

  const testProps = {
    clickContent: <button>モーダルを開く</button>,
    modalText: '関数を実行しますか？',
    executeButtonText: '実行',
    handleExecute: mockHandleExecute,
  };

  it('クリック時にモーダルが開く', async () => {
    // arrange
    render(<BaseModal {...testProps} />);
    const openButton = screen.getByText('モーダルを開く');

    // act
    await user.click(openButton);
    const modalText = screen.getByText('関数を実行しますか？');

    // assert
    expect(openButton).toBeInTheDocument();
    expect(modalText).toBeInTheDocument();
  });

  it('実行ボタンを押すと関数が実行され,モーダルが閉じる', async () => {
    // arrange
    render(<BaseModal {...testProps} />);
    const openButton = screen.getByText('モーダルを開く');

    // act
    await user.click(openButton);
    const executeButton = screen.getByText('実行');
    await user.click(executeButton);

    // assert
    expect(mockHandleExecute).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('関数を実行しますか？')).not.toBeInTheDocument();
  });

  it('キャンセルボタンを押すとモーダルが閉じる', async () => {
    // arrange
    render(<BaseModal {...testProps} />);
    const openButton = screen.getByText('モーダルを開く');

    // act
    await user.click(openButton);
    const cancelButton = screen.getByText('キャンセル');
    await user.click(cancelButton);

    // assert
    expect(screen.queryByText('関数を実行しますか？')).not.toBeInTheDocument();
  });
});

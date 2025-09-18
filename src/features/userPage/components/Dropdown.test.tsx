import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Dropdown from './Dropdown';

describe('Dropdown Component', () => {
  const onUpdate = vi.fn();
  const user = userEvent.setup();
  const options = [
    { id: 1, name: 'name1' },
    { id: 2, name: 'name2' },
    { id: 3, name: 'name3' },
  ];

  it('初期値が表示される', () => {
    // arrange
    render(
      <Dropdown
        options={options}
        getName={(option) => option.name}
        currentValue='name1'
        onUpdate={onUpdate}
      />,
    );
    const select = screen.getByRole('combobox');

    // assert
    expect(select).toHaveTextContent('name1');
  });

  it('選択した値が更新される', async () => {
    // arrange
    render(
      <Dropdown
        options={options}
        getName={(option) => option.name}
        currentValue='name2'
        onUpdate={onUpdate}
      />,
    );
    const select = screen.getByRole('combobox');

    // act
    await user.click(select);
    await user.click(screen.getByText('name3'));

    // assert
    expect(onUpdate).toHaveBeenCalledWith('name3');
    expect(select).toHaveTextContent('name3');
  });
});

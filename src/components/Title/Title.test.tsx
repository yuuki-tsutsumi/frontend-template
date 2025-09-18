import { render, screen } from '@testing-library/react';
import { Title } from './Title';

describe('Title Component', () => {
  it('正しくレンダリングされている', () => {
    // arrange
    render(<Title title='テストタイトル' />);
    const titleElement = screen.getByText('テストタイトル');

    // assert
    expect(titleElement).toBeInTheDocument();
  });
});

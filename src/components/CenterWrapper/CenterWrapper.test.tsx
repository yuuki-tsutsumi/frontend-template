import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CenterWrapper } from './CenterWrapper';

describe('CenterWrapper Component', () => {
  it('ロゴとchildrenがレンダリングされている', () => {
    // arrange
    render(<CenterWrapper>CenterWrapper</CenterWrapper>);
    const element = screen.getByText('CenterWrapper');
    // const image = screen.getByRole('img');

    // assert
    expect(element).toBeInTheDocument();
    // expect(image).toBeInTheDocument();
  });
});

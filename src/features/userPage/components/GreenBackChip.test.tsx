import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import GreenBackChip from './GreenBackChip';

describe('GreenBackChip Component', () => {
  it('緑背景で描画されている', () => {
    // arrange
    render(<GreenBackChip label='label' isGreenBack />);
    const chip = screen.getByText('label');

    // assert
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveStyle('color: white');
  });

  it('グレー背景で描画されている', () => {
    // arrange
    render(<GreenBackChip label='label' isGreenBack={false} />);
    const chip = screen.getByText('label');

    // assert
    expect(chip).toHaveStyle('color: black');
  });
});

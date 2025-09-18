import React from 'react';
import { Chip } from '@mui/material';

type GreenBackChipProps = {
  label: string;
  isGreenBack: boolean;
};

const GreenBackChip: React.FC<GreenBackChipProps> = ({
  label,
  isGreenBack,
}) => (
  <Chip
    label={label}
    style={{
      backgroundColor: isGreenBack ? 'green' : 'rgba(169, 169, 169, 0.3)',
      color: isGreenBack ? 'white' : 'black',
    }}
    variant='outlined'
  />
);

export default GreenBackChip;

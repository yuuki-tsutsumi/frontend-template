import { Box, BoxProps, Typography } from '@mui/material';
import { FC } from 'react';

type TitleProps = {
  title: string;
} & Omit<BoxProps, 'sx.padding' | 'sx.borderBottom'>;

export const Title: FC<TitleProps> = ({ title, ...restProps }) => {
  return (
    <Box sx={{ padding: 2, borderBottom: '1px solid #e0e0e0' }} {...restProps}>
      <Typography variant='h5' sx={{ margin: 0 }}>
        {title}
      </Typography>
    </Box>
  );
};

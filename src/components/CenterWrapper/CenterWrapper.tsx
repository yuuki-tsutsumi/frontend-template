import React, { FC, ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';
// import Image from 'next/image';

type WrapperProps = {
  children: ReactNode;
} & Pick<BoxProps, 'height'>;

// ロゴサイズ 544 × 383
export const CenterWrapper: FC<WrapperProps> = ({
  children,
  height = '80vh',
}) => {
  return (
    <Box
      display='flex'
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      width='100%'
      height={height}
    >
      {/* <Image
        src='/logo.png'
        alt='Product Logo'
        width={108}
        height={76}
        style={{ paddingBottom: 20, height: 'auto' }}
      /> */}
      {children}
    </Box>
  );
};

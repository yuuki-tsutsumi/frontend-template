import React from 'react';
import { useAuthRedirect } from '@/hooks/auth';
import { Box } from '@mui/material';
import { useStyles } from '@/styles/style';

const IndexPage: React.FC = () => {
  const classes = useStyles();
  useAuthRedirect();
  return (
    <Box className={classes.fullHeightChild} display='flex'>
      <iframe
        title='お問い合わせフォーム'
        src='https://...'
        style={{ border: 'none', width: '100%', height: '100%' }}
        allowFullScreen
      />
    </Box>
  );
};

export default IndexPage;

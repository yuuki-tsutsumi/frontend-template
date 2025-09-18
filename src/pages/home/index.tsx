import { useAuthRedirect } from '@/hooks/auth';
import Head from 'next/head';
import { Box, Typography } from '@mui/material';
import { Title } from '@/components/Title';
import { useStyles } from '@/styles/style';

export default function Home() {
  const classes = useStyles();
  useAuthRedirect();

  return (
    <>
      <Head>
        <title>Title</title>
      </Head>
      <Box
        className={classes.fullHeightChild}
        display='flex'
        flexDirection='column'
      >
        <Title title='ホーム' />
        <Box display='flex' sx={{ padding: 2, height: 'calc(100vh - 70px)' }}>
          {/* メインコンテンツエリア */}
          <Box sx={{ flex: 1, pr: 2 }}>
            <Box sx={{ mt: 8, textAlign: 'center', fontSize: 45 }}>
              hogehoge
            </Box>
          </Box>

          {/* 右側のテンプレートセクション */}
          <Box sx={{ width: 280, borderLeft: '1px solid #e0e0e0', pl: 2 }}>
            <Typography variant='h6' gutterBottom>
              hogehoge
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}

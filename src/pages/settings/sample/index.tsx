import { SettingSideList } from '@/components/SettingSideList';
import { Title } from '@/components/Title';
import { Role } from '@/entity/user';
import { useAuthRedirect, usePermissionRedirect } from '@/hooks/auth';
import { Box, Link, Typography } from '@mui/material';
import Head from 'next/head';

export default function Setting() {
  useAuthRedirect();
  usePermissionRedirect([Role.AppAdmin, Role.Member]);
  return (
    <>
      <Head>
        <title>設定</title>
      </Head>
      <Title title='設定' />
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
        }}
      >
        <SettingSideList sideListWidth={250} />
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography sx={{ mb: 1 }}>
            hogehoge
            <Link
              href='https://....'
              underline='hover'
              target='_blank'
              rel='noopener'
              sx={{ ml: 0.5 }}
            >
              こちら
            </Link>
          </Typography>
        </Box>
      </Box>
    </>
  );
}

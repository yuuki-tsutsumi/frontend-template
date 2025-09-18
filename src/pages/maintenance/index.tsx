import { Box, Typography, Container } from '@mui/material';

export default function Maintenance() {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        background: '#fff', // サイドメニューの上に白背景
        zIndex: 9999, // サイドメニューより前面に
      }}
    >
      <Container maxWidth='md'>
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Typography variant='h4' component='h1' gutterBottom>
            メンテナンス中
          </Typography>
          <Typography variant='body1' sx={{ mt: 2.5 }}>
            現在、システムメンテナンスを実施しております。
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

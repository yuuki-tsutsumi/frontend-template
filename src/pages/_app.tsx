import React from 'react';
import type { AppProps } from 'next/app';
import { useStyles } from '@/styles/style';
import { useRouter } from 'next/router';
import { AuthProvider } from '@/providers/AuthProvider';
import { Sidebar } from '@/components/Sidebar';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '@/styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  const classes = useStyles();
  const router = useRouter();

  const sidebarHiddenPages = [
    '/',
    '/login',
    '/signup',
    '/login/reset-password',
  ];
  const isSidebarHiddenPage = sidebarHiddenPages.includes(router.pathname);
  const isSignupPage = router.pathname === '/signup';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!isSidebarHiddenPage ? (
        <AuthProvider>
          <Sidebar />
          <main className={classes.content}>
            <Component {...pageProps} />
          </main>
        </AuthProvider>
      ) : isSignupPage ? (
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </ThemeProvider>
  );
}

export default MyApp;

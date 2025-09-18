import React from 'react';
// import UserPage from '@/features/userPage/components/UserPage';
// import {
//   getRoleName,
//   getStatusName,
//   getTwoFactorAuthStatusName,
//   Role,
//   Status,
//   TwoFactorAuthStatus,
//   UserRow,
// } from '@/entity/user';
import Head from 'next/head';
import { useAuthRedirect } from '@/hooks/auth';
import { Box } from '@mui/material';

// const mockUsers: UserRow[] = [
//   {
//     id: 1,
//     name: 'tanaka_taro',
//     email: 'taro@example.com',
//     status: getStatusName(Status.Valid),
//     role: getRoleName(Role.OrgAdmin),
//     twoFactorAuth: getTwoFactorAuthStatusName(TwoFactorAuthStatus.Valid),
//   },
//   {
//     id: 2,
//     name: 'suzuki_ichiro',
//     email: 'ichiro@example.com',
//     status: getStatusName(Status.Invalid),
//     role: getRoleName(Role.Member),
//     twoFactorAuth: getTwoFactorAuthStatusName(TwoFactorAuthStatus.Invalid),
//   },
// ];

const User: React.FC = () => {
  useAuthRedirect();

  // テスト的にAPIコールしてみたサンプル。削除予定。
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await healthCheckApi.healthCheckHealthGet();
  //       console.log(res);
  //     } catch (error) {
  //       console.error('Error fetching health check:', error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <>
      <Head>
        <title>ユーザ管理</title>
      </Head>
      {/* <UserPage users={mockUsers} /> */}
      <Box sx={{ mt: 8, fontSize: 45, textAlign: 'center' }}>開発中</Box>
    </>
  );
};

export default User;

import Head from 'next/head';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { TextField, Button, Box, Link } from '@mui/material';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import { userPool } from '@/infra/aws/cognito';
import { CenterWrapper } from '@/components/CenterWrapper';

type FormData = {
  username: string;
  password: string;
};

const ERRMSG_LOGIN_FAILED = 'ログインに失敗しました。もう一度お試しください。';
const ERRMSG_NEW_PASSWORD_CHALLENGE_FAILED = 'パスワードの設定に失敗しました。';
const MSG_NEW_PASSWORD_PROMPT = '新しいパスワードを入力してください:';

const ERRMSG_USERID_IS_REQUIRED = 'ユーザIDは必須です';
const ERRMSG_PASSWORD_IS_REQUIRED = 'パスワードは必須です';
const ERRMSG_PASSWORD_TOO_SHORT = 'パスワードは12文字以上である必要があります';

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const authenticationData = {
      Username: data.username,
      Password: data.password,
    };

    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: data.username,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        router.push('/home');
      },
      onFailure: () => {
        alert(ERRMSG_LOGIN_FAILED);
      },
      newPasswordRequired: () => {
        const writableAttributes: Record<string, string> = {};

        const newPassword = prompt(MSG_NEW_PASSWORD_PROMPT);
        cognitoUser.completeNewPasswordChallenge(
          newPassword || '',
          writableAttributes,
          {
            onSuccess: () => {
              router.push('/home');
            },
            onFailure: () => {
              alert(ERRMSG_NEW_PASSWORD_CHALLENGE_FAILED);
            },
          },
        );
      },
    });
  };

  return (
    <>
      <Head>
        <title>ログイン</title>
      </Head>
      <CenterWrapper>
        <Box>
          <h1 style={{ margin: 0 }}>ログイン</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label='ユーザID'
              variant='outlined'
              fullWidth
              margin='normal'
              {...register('username', { required: ERRMSG_USERID_IS_REQUIRED })}
              error={!!errors.username}
              helperText={errors.username ? errors.username.message : ''}
            />
            <TextField
              label='パスワード'
              type='password'
              variant='outlined'
              fullWidth
              margin='normal'
              {...register('password', {
                required: ERRMSG_PASSWORD_IS_REQUIRED,
                minLength: {
                  value: 12,
                  message: ERRMSG_PASSWORD_TOO_SHORT,
                },
              })}
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
            />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              sx={{ height: 45, marginY: 2 }}
            >
              次へ
            </Button>
          </form>
          <Link href='/login/reset-password' underline='always'>
            パスワードを忘れた方はこちらから
          </Link>
        </Box>
      </CenterWrapper>
    </>
  );
}

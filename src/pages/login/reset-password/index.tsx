import { CenterWrapper } from '@/components/CenterWrapper';
import { PasswordField } from '@/components/PasswordField';
import { userPool } from '@/infra/aws/cognito';
import { Box, Button, TextField, Typography } from '@mui/material';
import { CognitoUser } from 'amazon-cognito-identity-js';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';

export type FormData = {
  username: string;
  authcode: string;
  newPassword: string;
  confirmPassword: string;
};

type CognitoError = Error & { code?: string };

const ERRMSG_SEND_EMAIL_FAILED =
  'メールの送信に失敗しました。もう一度お試しください。';
const ERRMSG_RESET_PASSWARD_FAILED =
  'パスワード再設定に失敗しました。もう一度お試しください。';
const ERRMSG_USERID_IS_REQUIRED = 'ユーザIDは必須です';
const ERRMSG_AUTHCODE_IS_REQUIRED = '確認コードは必須です';
const ERRMSG_AUTHCODE_IS_6_DIGITS = '確認コードは6桁で入力してください';
const ERRMSG_AUTHCODE_IS_INVALID =
  '確認コードが正しくありません。もう一度お試しください';
const MSG_RESET_PASSWARD_IS_SUCCESS = 'パスワードが再設定されました';

export default function ResetPassword() {
  const [username, setUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isAuthCodeSent, setIsAuthCodeSent] = useState<boolean>(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onBlur' });

  const onSendEmail: SubmitHandler<FormData> = (data) => {
    const userData = {
      Username: data.username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.forgotPassword({
      onSuccess: () => {
        setUsername(data.username);
        setIsAuthCodeSent(true);
      },
      onFailure: () => {
        alert(ERRMSG_SEND_EMAIL_FAILED);
      },
    });
  };

  const onSubmitAuthCodeAndNewPassward: SubmitHandler<FormData> = (data) => {
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmPassword(data.authcode, newPassword, {
      onSuccess: () => {
        alert(MSG_RESET_PASSWARD_IS_SUCCESS);
        router.push('/login');
      },
      onFailure: (err: CognitoError) => {
        switch (err.code) {
          case 'CodeMismatchException':
            alert(ERRMSG_AUTHCODE_IS_INVALID);
            break;
          default:
            alert(ERRMSG_RESET_PASSWARD_FAILED);
            break;
        }
      },
    });
  };

  return (
    <>
      <Head>
        <title>パスワードの再設定</title>
      </Head>
      <>
        <CenterWrapper height='90vh'>
          <Box maxWidth='480px'>
            {!isAuthCodeSent ? (
              <>
                <h1 style={{ margin: 0 }}>確認コードの送信</h1>
                <form onSubmit={handleSubmit(onSendEmail)}>
                  <Box my={1}>
                    <Typography mx={1} fontSize='12px' color='gray'>
                      アカウント登録したユーザIDを入力してください。パスワード再設定の連絡が登録されたメールアドレスに送信されます。
                      ※メールアドレス側でドメイン設定を行なっている場合は、事前に「verificationemail.com」からメールを受信できるように変更をお願いします。
                    </Typography>
                    <TextField
                      label='ユーザID'
                      variant='outlined'
                      fullWidth
                      {...register('username', {
                        required: ERRMSG_USERID_IS_REQUIRED,
                      })}
                      error={!!errors.username}
                      helperText={
                        errors.username ? errors.username.message : ''
                      }
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    type='submit'
                    sx={{ h: 45 }}
                  >
                    送信する
                  </Button>
                </form>
              </>
            ) : (
              <>
                <h1 style={{ margin: 0 }}>新パスワード入力</h1>
                <form onSubmit={handleSubmit(onSubmitAuthCodeAndNewPassward)}>
                  <Box my={1}>
                    <Typography mb={1} fontSize='12px' color='gray'>
                      登録されたメールアドレスに確認コードが送信されました。
                    </Typography>
                    <Typography>確認コード</Typography>
                    <TextField
                      label='確認コード'
                      variant='outlined'
                      fullWidth
                      error={!!errors.authcode}
                      helperText={errors.authcode?.message}
                      {...register('authcode', {
                        required: ERRMSG_AUTHCODE_IS_REQUIRED,
                        validate: (value) =>
                          /^\d{6}$/.test(value) || ERRMSG_AUTHCODE_IS_6_DIGITS,
                      })}
                      slotProps={{
                        input: {
                          inputComponent:
                            InputMask as unknown as React.ComponentType,
                          inputProps: {
                            mask: '999999',
                            maskChar: '',
                          },
                        },
                      }}
                      sx={{ mt: 1, mb: 4 }}
                    />
                    <Typography>パスワード</Typography>
                    <PasswordField
                      label='パスワード'
                      registerName='newPassword'
                      password={newPassword}
                      setPassword={setNewPassword}
                      register={register}
                      watch={watch}
                      errors={errors}
                      sx={{ mt: 1, mb: 1 }}
                    />
                    <Typography mt={1} mb={4} fontSize='12px' color='gray'>
                      パスワードは最低12文字以上が必要です。大文字と小文字を組み合わせ、数字（0-9）と特殊文字（例:
                      !, @, #, $, %, ^, &, *,
                      など）をそれぞれ1つ以上含めてください。
                    </Typography>
                  </Box>
                  <Box my={1}>
                    <Typography>パスワード確認用</Typography>
                    <PasswordField
                      label='パスワード確認用'
                      registerName='confirmPassword'
                      password={confirmPassword}
                      setPassword={setConfirmPassword}
                      register={register}
                      watch={watch}
                      errors={errors}
                      sx={{ mt: 1, mb: 1 }}
                    />
                  </Box>
                  <Button
                    fullWidth
                    variant='contained'
                    color='primary'
                    type='submit'
                    sx={{ height: 45 }}
                  >
                    登録する
                  </Button>
                </form>
              </>
            )}
          </Box>
        </CenterWrapper>
      </>
    </>
  );
}

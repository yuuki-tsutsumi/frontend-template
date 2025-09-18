import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useAuthRedirect, usePermissionRedirect } from '@/hooks/auth';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { CenterWrapper } from '@/components/CenterWrapper';
import { Role } from '@/entity/user';
import { PasswordField } from '@/components/PasswordField/PasswordField';
import { BaseSnackbar } from '@/components/Snackbar';
import { OrganizationResponse } from '@/infra/interface/openapi';
import { organizationApi, userApi } from '@/infra/interface/api';

export type FormData = {
  username: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
  name: string;
  role: Role;
  organization: number;
};

const ERRMSG_SIGNUP_FAILED =
  'サインアップに失敗しました。もう一度お試しください。';
const ERRMSG_USERNAME_IS_REQUIRED = 'ユーザー名は必須です';
const ERRMSG_EMAIL_IS_REQUIRED = 'メールアドレスは必須です';
const ERRMSG_NAME_IS_REQUIRED = '名前は必須です';

export default function SignUp() {
  useAuthRedirect();
  usePermissionRedirect([Role.OrgAdmin, Role.Member]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormData>();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [organizations, setOrganizations] = useState<OrganizationResponse[]>(
    [],
  );
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response =
          await organizationApi.getAllOrganizationsApiOrganizationGet();
        if (response.status !== 200) {
          throw new Error('組織一覧の取得に失敗しました');
        }
        const data = response.data;
        setOrganizations(data);
        if (data && data.length > 0) {
          setValue('organization', data[0].id);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, [setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await userApi.createUserApiUserPost({
        cognito_user_id: data.username,
        email: data.email,
        display_name: data.name,
        role: data.role,
        organization_id: data.organization,
        password: data.newPassword,
      });

      setSnackbarOpen(true);
    } catch (dbError) {
      console.error('DBへのユーザー登録に失敗しました:', dbError);
      alert(ERRMSG_SIGNUP_FAILED);
      return;
    }
  };

  return (
    <>
      <Head>
        <title>サインアップ</title>
      </Head>
      <CenterWrapper height='90vh'>
        <Box>
          <h1 style={{ margin: 0 }}>アカウント登録</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box my={1}>
              <TextField
                label='ユーザID'
                type='text'
                variant='outlined'
                fullWidth
                margin='normal'
                {...register('username', {
                  required: ERRMSG_USERNAME_IS_REQUIRED,
                })}
                error={!!errors.username}
                helperText={errors.username ? errors.username.message : ''}
                sx={{ mt: 1, mb: 1 }}
              />
              <TextField
                label='メールアドレス'
                type='email'
                variant='outlined'
                fullWidth
                margin='normal'
                {...register('email', { required: ERRMSG_EMAIL_IS_REQUIRED })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
                sx={{ mt: 1, mb: 1 }}
              />
              <PasswordField
                label='パスワード'
                registerName='newPassword'
                password={newPassword}
                setPassword={setNewPassword}
                register={register}
                watch={watch}
                errors={errors}
                sx={{ mt: 1, mb: 2 }}
              />
              <PasswordField
                label='パスワード確認用'
                registerName='confirmPassword'
                password={confirmPassword}
                setPassword={setConfirmPassword}
                compareWithField='newPassword'
                register={register}
                watch={watch}
                errors={errors}
                sx={{ mt: 1, mb: 0 }}
              />
              <TextField
                label='名前'
                type='name'
                variant='outlined'
                fullWidth
                margin='normal'
                {...register('name', {
                  required: ERRMSG_NAME_IS_REQUIRED,
                })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
              <TextField
                id='role-field'
                select
                label='ロール'
                variant='outlined'
                fullWidth
                margin='normal'
                {...register('role')}
                error={!!errors.role}
                helperText={errors.role ? errors.role.message : ''}
                sx={{ mt: 1, mb: 1 }}
              >
                <MenuItem value={Role.AppAdmin}>アプリ管理者</MenuItem>
                <MenuItem value={Role.OrgAdmin}>管理者</MenuItem>
                <MenuItem value={Role.Member}>メンバ</MenuItem>
              </TextField>
              {organizations.length > 0 && (
                <TextField
                  id='organization-field'
                  select
                  label='組織'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  {...register('organization')}
                  error={!!errors.organization}
                  helperText={
                    errors.organization ? errors.organization.message : ''
                  }
                  sx={{ mt: 1, mb: 1 }}
                >
                  {organizations.map((org) => (
                    <MenuItem key={org.id} value={org.id}>
                      {org.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Box>
            <Button
              fullWidth
              variant='contained'
              color='primary'
              type='submit'
              sx={{ height: 45, marginY: 2 }}
            >
              サインアップ
            </Button>
          </form>
        </Box>
      </CenterWrapper>
      <BaseSnackbar
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        message='アカウント登録が完了しました。メールをご確認ください。'
      />
    </>
  );
}

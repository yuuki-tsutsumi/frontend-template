import { SettingSideList } from '@/components/SettingSideList';
import { Title } from '@/components/Title';
import { Role } from '@/entity/user';
import { useAuthRedirect, usePermissionRedirect } from '@/hooks/auth';
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
      <SettingSideList sideListWidth={250} />
    </>
  );
}

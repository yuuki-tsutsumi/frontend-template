import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userPool } from '@/infra/aws/cognito';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { useAuth } from '@/providers/AuthProvider';
import { Role } from '@/entity/user';

export const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      if (!auth) {
        router.push('/login');
      }
    };

    checkAuth();
  }, [router]);
};

export const usePermissionRedirect = (roleList: Role[]) => {
  const router = useRouter();
  const { role: currentUserRole, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return; // user_organization取得API読み込み中は何もしない
    if (roleList.includes(currentUserRole)) {
      router.push('/');
    }
  }, [router, currentUserRole, isLoading, roleList]);
};

const isAuthenticated = (): Promise<boolean> => {
  const cognitoUser = userPool.getCurrentUser();

  return new Promise((resolve) => {
    if (!cognitoUser) {
      resolve(false); // ユーザーがいない場合は未認証
      return;
    }

    cognitoUser.getSession((err: Error | null, session: CognitoUserSession) => {
      if (err || !session.isValid()) {
        resolve(false); // セッションエラーまたはトークンが無効
      } else {
        resolve(true); // 認証済み
      }
    });
  });
};

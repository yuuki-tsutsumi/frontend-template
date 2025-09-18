import { useRouter } from 'next/router';
import { userPool } from '@/infra/aws/cognito';
import { useEffect } from 'react';

export default function Redirect() {
  const router = useRouter();

  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}

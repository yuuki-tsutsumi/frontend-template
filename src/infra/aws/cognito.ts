import {
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID as string,
  ClientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
};
export const userPool = new CognitoUserPool(poolData);

const ERRMSG_FAIL_TO_GET_SESSION = 'セッションの取得に失敗しました';
const ERRMSG_INVALID_SESSION = 'セッションが無効です';
const ERRMSG_NOT_FOUND_USER = 'ユーザーが見つかりません';

export const getAccessToken = (): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.getSession(
        (err: Error | null, session: CognitoUserSession) => {
          if (err) {
            return reject(new Error(ERRMSG_FAIL_TO_GET_SESSION));
          }
          if (session && session.isValid()) {
            resolve(session.getAccessToken().getJwtToken());
          } else {
            reject(new Error(ERRMSG_INVALID_SESSION));
          }
        },
      );
    } else {
      reject(new Error(ERRMSG_NOT_FOUND_USER));
    }
  });
};

const ERRMSG_TOKEN_IS_STILL_VALID = 'トークンはまだ有効です';
const ERRMSG_SOMETHING_WRONG_WITH_TOKEN_REFRESH =
  'トークンリフレッシュでエラーが発生しました';

export const refreshSession = () => {
  const currentUser = userPool.getCurrentUser();

  if (!currentUser) {
    throw new Error(ERRMSG_NOT_FOUND_USER);
  }

  currentUser.getSession((err: Error | null, session: CognitoUserSession) => {
    if (err) {
      throw new Error(ERRMSG_FAIL_TO_GET_SESSION);
    }

    if (session && session.isValid()) {
      throw new Error(ERRMSG_TOKEN_IS_STILL_VALID);
    }

    currentUser.refreshSession(
      session.getRefreshToken(),
      (err: Error | null) => {
        if (err) {
          throw new Error(ERRMSG_SOMETHING_WRONG_WITH_TOKEN_REFRESH);
        }
        return;
      },
    );
  });
};

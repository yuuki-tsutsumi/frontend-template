import { vi } from 'vitest';

export const mockCognitoIdentityJS = () => {
  vi.mock('amazon-cognito-identity-js', () => {
    return {
      CognitoUserPool: vi.fn().mockImplementation(() => ({
        getCurrentUser: () => ({
          getSession: (
            cb: (
              error: Error | null,
              session: {
                isValid: () => boolean;
                getIdToken: () => { getJwtToken: () => string };
              },
            ) => void,
          ) =>
            cb(null, {
              isValid: () => true,
              getIdToken: () => ({
                getJwtToken: () => 'mocked-token',
              }),
            }),
          signOut: vi.fn(),
        }),
      })),
      CognitoUser: vi.fn(),
      AuthenticationDetails: vi.fn(),
    };
  });
};

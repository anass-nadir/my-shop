import { sign, SignOptions, signTestUser } from '@anass-nadir/my-shop-common';
import { IUserJwtPayload, IUserPayload } from 'IUser';

export const generateUserJwt = async (
  userKey: IUserPayload['_id'],
  options?: SignOptions
): Promise<string> => {
  if (process.env.NODE_ENV !== 'test') {
    return sign(
      {
        key: userKey
      },
      process.env.JWT_SECRET_PRIV!,
      {
        expiresIn: '1d',
        algorithm: 'RS256',
        ...options
      }
    );
  }
  const { token } = (await signTestUser(
    process.env.JWT_SECRET!,
    {
      key: userKey
    },
    {},
    '',
    false
  )) as { payload: IUserJwtPayload; token: string };
  return token;
};

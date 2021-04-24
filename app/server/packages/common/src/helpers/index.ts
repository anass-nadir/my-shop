import { SignOptions, Secret, sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { IUserJwtPayload } from 'IUser';

export const signUser = (
  payload: IUserJwtPayload,
  secret: Secret,
  options?: SignOptions
): string => sign(payload, secret, options);

export const signTestUser = (
  secret: Secret,
  sessionName?: string,
  options?: SignOptions,
  cookie = true
): [string] | { payload: IUserJwtPayload; token: string } => {
  const payload = {
    _id: randomBytes(12).toString('hex'),
    name: 'test',
    email: 'test@test.com'
  };
  const token = signUser(payload, secret, options);
  if (!cookie) return { payload, token };
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`${sessionName}=${base64}; path=/; httponly`];
};

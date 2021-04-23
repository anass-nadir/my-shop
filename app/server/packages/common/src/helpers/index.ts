import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { randomBytes } from 'crypto';

export const signUser = (
  payload: IUser.JwtPayload,
  secret: Secret,
  options?: SignOptions
): string => jwt.sign(payload, secret, options);

export const signTestUser = (
  secret: Secret,
  sessionName?: string,
  options?: SignOptions,
  cookie = true
): [string] | { payload: IUser.JwtPayload; token: string } => {
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

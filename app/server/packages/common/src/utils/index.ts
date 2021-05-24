import { SignOptions, sign, Secret } from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { IUserJwtPayload } from 'IUser';

export const checkEnvVars = (vars: string[] | [] = []): string[] | [] => {
  const envVars = Array.from(
    new Set([
      'NODE_ENV',
      'SESSION_NAME',
      'PUBLIC_URL',
      'SESSION_SECRET',
      'JWT_SECRET',
      'MONGO_USERNAME',
      'MONGO_PASSWORD',
      'MONGO_URIS',
      'MONGO_PORT',
      'MONGO_DB',
      ...vars
    ])
  );
  return envVars.filter(key => !Object.keys(process.env).includes(key));
};

export const signTestUser = (
  secret: Secret,
  data?: IUserJwtPayload,
  options?: SignOptions,
  sessionName?: string,
  cookie = true
): Promise<[string] | { payload: IUserJwtPayload; token: string }> => {
  return new Promise(res => {
    const payload = Object.assign(
      {},
      {
        key: randomBytes(12).toString('hex'),
        name: 'test',
        email: 'test@test.com'
      },
      data
    );
    const token = sign(payload, secret, options);
    if (!cookie) return res({ payload, token });
    const session = { jwt: token };
    const sessionJSON = JSON.stringify(session);
    const base64 = Buffer.from(sessionJSON).toString('base64');

    res([`${sessionName}=${base64}; path=/; httponly`]);
  });
};
export { sign };
export type { Secret, SignOptions };

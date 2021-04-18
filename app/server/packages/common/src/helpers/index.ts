import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { IUserJwtPayload } from '../types';

export const signUser = (
  payload: IUserJwtPayload,
  secret: Secret,
  options?: SignOptions
): string => jwt.sign(payload, secret, options);

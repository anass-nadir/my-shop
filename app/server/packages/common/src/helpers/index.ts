import jwt, { SignOptions } from 'jsonwebtoken';
import { IUserJwtPayload } from '../types';

export const signUser = (
  payload: IUserJwtPayload,
  options?: SignOptions
): string => jwt.sign(payload, process.env.JWT_SECRET!, options);

declare module 'IUser' {
  import type { ObjectId } from 'mongoose';
  interface IUserSchema {
    name: string;
    email: string;
    phone?: string;
    gender?: string;
    address?: [];
    town?: string;
    country?: string;
    password?: string;
    googleId?: string;
    stripeId?: string;
  }
  interface IUserPayload extends Omit<IUserSchema, 'password'> {
    _id: ObjectId;
  }
  interface IUserTestPayload extends Partial<IUserSchema> {
    _id?: ObjectId | string;
  }

  interface IUserJwtPayload extends Partial<IUserSchema> {
    key?: ObjectId | string;
    exp?: number;
    iat?: number;
  }
}

declare module 'IUser' {
  export interface IUserSchema {
    name: string;
    email: string;
    phone: string;
    gender?: string;
    address: [];
    town: string;
    country: string;
    password: string;
    googleId?: string;
    stripeId?: string;
  }
  export interface IUserTestPayload {
    name?: string;
    email?: string;
    phone?: string;
    gender?: string;
    address?: [];
    town?: string;
    country?: string;
    password?: string;
    confirmPassword?: string;
    googleId?: string;
    stripeId?: string;
  }
  export interface IUserJwtPayload {
    _id: string;
    name: string;
    email: string;
    exp?: number;
    iat?: number;
  }
}

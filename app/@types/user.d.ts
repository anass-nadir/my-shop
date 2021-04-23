declare namespace IUser {
  export interface Schema {
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
  export interface TestPayload {
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
  export interface JwtPayload {
    _id: string;
    name: string;
    email: string;
    exp?: number;
    iat?: number;
  }
}

export interface IUserJwtPayload {
  _id: string;
  name: string;
  email: string;
  exp?: number;
  iat?: number;
}

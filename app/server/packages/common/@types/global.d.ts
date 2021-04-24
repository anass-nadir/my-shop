import { IUserJwtPayload } from 'IUser';
declare global {
  export namespace Express {
    export interface Request {
      currentUser?: IUserJwtPayload;
    }
  }
}

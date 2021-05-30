/// <reference types="node" />
import { IUserJwtPayload } from 'IUser';
declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserJwtPayload;
    }
  }
}

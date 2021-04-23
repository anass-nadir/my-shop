declare namespace Express {
  export interface Request {
    currentUser?: IUser.JwtPayload;
  }
}

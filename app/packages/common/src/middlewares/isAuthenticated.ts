import { Request, Response, NextFunction } from 'express';
import { BadRequestError, NotAuthorizedError } from '../errors';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { IUserJwtPayload } from 'IUser';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  if (req.session?.jwt) {
    try {
      const user = jwt.verify(
        req.session.jwt,
        process.env.JWT_SECRET!
      ) as IUserJwtPayload;

      req.currentUser = user;
      return next();
    } catch (err) {
      process.env.NODE_ENV !== 'test' && console.error(err);
      req.currentUser = undefined;
      if (err instanceof TokenExpiredError)
        throw new BadRequestError(err.message);
    }
  }
  throw new NotAuthorizedError();
};

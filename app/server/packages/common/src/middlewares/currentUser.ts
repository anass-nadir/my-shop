import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUserJwtPayload } from 'IUser';

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.session?.jwt) {
    req.currentUser = undefined;
    return next();
  }

  try {
    const user = jwt.verify(
      req.session.jwt,
      process.env.JWT_SECRET!
    ) as IUserJwtPayload;
    req.currentUser = user?.exp ? user : undefined;
  } catch (err) {
    req.currentUser = undefined;
  }

  next();
};

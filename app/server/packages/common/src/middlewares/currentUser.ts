import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
    ) as IUser.JwtPayload;
    req.currentUser = user?.exp ? user : undefined;
  } catch (err) {
    req.currentUser = undefined;
  }

  next();
};

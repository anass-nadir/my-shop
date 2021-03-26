import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
  _id: string;
  name: string;
  email: string;
  exp?: number;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

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
    ) as UserPayload;
    req.currentUser = user?.exp ? user : undefined;
  } catch (err) {
    req.currentUser = undefined;
  }

  next();
};

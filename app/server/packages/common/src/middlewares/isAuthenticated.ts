import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.currentUser) {
    if (process.env.NODE_ENV !== 'test') throw new NotAuthorizedError();

    return res.status(401).json({ message: 'sorry, authentication required' });
  }

  next();
};

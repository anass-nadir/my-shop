import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  if (!req.currentUser) {
    return res.status(401).json({ message: 'sorry, authentication required' });
  }

  next();
};

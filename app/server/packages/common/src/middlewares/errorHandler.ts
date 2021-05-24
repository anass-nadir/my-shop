import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/customError';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  process.env.NODE_ENV !== 'test' && console.error(err);
  return res.status(400).send({
    errors: [{ message: 'Something went wrong' }]
  });
};

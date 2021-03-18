import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { FieldsValidationError } from '../errors';

export const fieldsValidation = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new FieldsValidationError(errors.array());
  }

  next();
};

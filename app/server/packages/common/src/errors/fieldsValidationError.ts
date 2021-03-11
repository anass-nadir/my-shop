import { ValidationError } from 'express-validator';
import { CustomError } from './customError';

export class FieldsValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request fields');
    Object.setPrototypeOf(this, FieldsValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(err => {
      return { message: err.msg, field: err.param };
    });
  }
}

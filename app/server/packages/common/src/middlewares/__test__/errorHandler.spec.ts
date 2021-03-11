import { Request, Response } from 'express';
import { ValidationError } from 'express-validator';

import { errorHandler } from '../';
import { DatabaseConnectionError, FieldsValidationError } from '../../errors';

describe('error handler middleware', () => {
  it('handles any error', () => {
    errorHandler(
      new Error(),
      global.mockRequest as Request,
      global.mockResponse as Response,
      global.nextFunction
    );
    expect(global.mockResponse.send).toBeCalledWith({
      errors: [{ message: 'Something went wrong' }]
    });
    expect(global.mockResponse.status).toHaveBeenCalledWith(400);
  });

  it('handles database connection error', () => {
    errorHandler(
      new DatabaseConnectionError(),
      global.mockRequest as Request,
      global.mockResponse as Response,
      global.nextFunction
    );
    expect(global.mockResponse.send).toBeCalledWith({
      errors: [{ message: 'Error connecting to database' }]
    });
    expect(global.mockResponse.status).toHaveBeenCalledWith(500);
  });

  it('handles fields validation error', () => {
    const fields = [
      {
        msg: 'A valid email is required',
        param: 'email',
        location: 'body'
      },
      {
        msg: 'A strong password is required',
        param: 'password',
        location: 'body'
      }
    ] as ValidationError[];
    errorHandler(
      new FieldsValidationError(fields),
      global.mockRequest as Request,
      global.mockResponse as Response,
      global.nextFunction
    );
    expect(global.mockResponse.send).toBeCalledWith({
      errors: [
        { message: fields[0].msg, field: fields[0].param },
        { message: fields[1].msg, field: fields[1].param }
      ]
    });
    expect(global.mockResponse.status).toHaveBeenCalledWith(400);
  });
});

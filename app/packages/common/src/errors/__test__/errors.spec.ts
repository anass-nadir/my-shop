import {
  BadRequestError,
  DatabaseConnectionError,
  NotAuthorizedError,
  NotFoundError,
  FieldsValidationError
} from '..';
import { ValidationError } from 'express-validator';
describe('Custom Errors Specs', () => {
  test('bad request error', () => {
    try {
      throw new BadRequestError('This is bad');
    } catch (err) {
      expect(err.statusCode).toEqual(400);
      expect(err.message).toEqual('This is bad');
    }
  });
  test('database connection error', () => {
    try {
      throw new DatabaseConnectionError();
    } catch (err) {
      expect(err.statusCode).toEqual(500);
      expect(err.message).toEqual('Error connecting to database');
    }
  });
  test('not authorized error', () => {
    try {
      throw new NotAuthorizedError();
    } catch (err) {
      expect(err.statusCode).toEqual(401);
      expect(err.message).toEqual('Not Authorized');
    }
  });
  test('not found error', () => {
    try {
      throw new NotFoundError();
    } catch (err) {
      expect(err.statusCode).toEqual(404);
      expect(err.message).toEqual('Route not found');
    }
  });
  test('fields validation error', () => {
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
    try {
      throw new FieldsValidationError(fields);
    } catch (err) {
      expect(err.serializeErrors()[0].message).toEqual(fields[0].msg);
      expect(err.statusCode).toEqual(400);
      expect(err.message).toEqual('Invalid request fields');
    }
  });
});

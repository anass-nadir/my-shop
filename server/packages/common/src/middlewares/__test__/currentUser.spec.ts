import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { currentUser } from '../';

jest.setTimeout(2000);
describe('currentUser from session middleware', () => {
  beforeAll(() => {
    process.env.JWT_SECRET = 'asdasdasd';
  });
  it('should pass without returning the current user', () => {
    currentUser(
      global.mockRequest as Request,
      global.mockResponse as Response,
      global.nextFunction
    );
    expect(global.mockRequest.currentUser).toBeUndefined();
    expect(global.nextFunction).toBeCalledTimes(1);
  });

  it('catches expired tokens', async () => {
    const User = {
      _id: 'adadad',
      name: 'test',
      email: 'test@test.com'
    };
    const userJwt = jwt.sign(User, process.env.JWT_SECRET!, { expiresIn: 1 });
    global.mockRequest = {
      session: {
        jwt: userJwt
      }
    };
    currentUser(
      global.mockRequest as Request,
      global.mockResponse as Response,
      global.nextFunction
    );
    expect(global.nextFunction).toBeCalledTimes(1);
    expect(global.mockRequest.currentUser).toEqual(
      expect.objectContaining(User)
    );

    await new Promise((res) =>
      setTimeout(() => {
        currentUser(
          global.mockRequest as Request,
          global.mockResponse as Response,
          global.nextFunction
        );
        res(true);
      }, 2000)
    );
    expect(global.nextFunction).toBeCalledTimes(2);
    expect(global.mockRequest.currentUser).toBeUndefined();
  });

  it('should pass with the current user object', () => {
    const User = {
      _id: 'adadad',
      name: 'test',
      email: 'test@test.com'
    };
    const userJwt = jwt.sign(User, process.env.JWT_SECRET!, { expiresIn: 1 });
    global.mockRequest = {
      session: {
        jwt: userJwt
      }
    };
    currentUser(
      global.mockRequest as Request,
      global.mockResponse as Response,
      global.nextFunction
    );

    expect(global.nextFunction).toBeCalledTimes(1);
    expect(global.mockRequest.currentUser).toEqual(
      expect.objectContaining(User)
    );
  });
});

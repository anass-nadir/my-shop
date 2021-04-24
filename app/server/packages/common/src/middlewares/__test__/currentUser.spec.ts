import { Request, Response } from 'express';
import { IUserJwtPayload } from 'IUser';

import { currentUser } from '../';
import { signTestUser } from '../../helpers';

jest.setTimeout(2000);
describe('currentUser from session middleware', () => {
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
    const userJwt = signTestUser(
      process.env.JWT_SECRET!,
      '',
      {
        expiresIn: 1
      },
      false
    ) as { payload: IUserJwtPayload; token: string };

    global.mockRequest = {
      session: {
        jwt: userJwt.token
      }
    };
    currentUser(
      global.mockRequest as Request,
      global.mockResponse as Response,
      global.nextFunction
    );
    expect(global.nextFunction).toBeCalledTimes(1);
    expect(global.mockRequest.currentUser).toEqual(
      expect.objectContaining(userJwt.payload)
    );

    await new Promise(res =>
      setTimeout(() => {
        currentUser(
          global.mockRequest as Request,
          global.mockResponse as Response,
          global.nextFunction
        );
        res(true);
      }, 1200)
    );
    expect(global.nextFunction).toBeCalledTimes(2);
    expect(global.mockRequest.currentUser).toBeUndefined();
  });

  it('should pass with the current user object', () => {
    const userJwt = signTestUser(
      process.env.JWT_SECRET!,
      '',
      {
        expiresIn: 10
      },
      false
    ) as { payload: IUserJwtPayload; token: string };
    global.mockRequest = {
      session: {
        jwt: userJwt.token
      }
    };
    currentUser(
      global.mockRequest as Request,
      global.mockResponse as Response,
      global.nextFunction
    );

    expect(global.nextFunction).toBeCalledTimes(1);
    expect(global.mockRequest.currentUser).toEqual(
      expect.objectContaining(userJwt.payload)
    );
  });
});

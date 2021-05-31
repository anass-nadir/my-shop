import { Request, Response } from 'express';
import { IUserJwtPayload } from 'IUser';
import { isAuthenticated } from '../';
import { signTestUser } from '../../utils';

jest.setTimeout(2000);

describe('Authorization middleware', () => {
  it('should return 401 and authentication required message', () => {
    expect(() => {
      isAuthenticated(
        global.mockRequest as Request,
        global.mockResponse as Response,
        global.nextFunction
      );
    }).toThrowError('Not Authorized');
  });

  it('should pass with the current user object', async () => {
    const userJwt = (await signTestUser(
      process.env.JWT_SECRET!,
      {},
      {
        expiresIn: 10
      },
      '',
      false
    )) as { payload: IUserJwtPayload; token: string };
    global.mockRequest = {
      session: {
        jwt: userJwt.token
      }
    };
    isAuthenticated(
      global.mockRequest as Request,
      global.mockResponse as Response,
      global.nextFunction
    );

    expect(global.nextFunction).toBeCalledTimes(1);
    expect(global.mockRequest.currentUser).toEqual(
      expect.objectContaining(userJwt.payload)
    );
  });

  it('catches expired tokens', async () => {
    const userJwt = (await signTestUser(
      process.env.JWT_SECRET!,
      {},
      {
        expiresIn: 1
      },
      '',
      false
    )) as { payload: IUserJwtPayload; token: string };

    global.mockRequest = {
      session: {
        jwt: userJwt.token
      }
    };
    isAuthenticated(
      global.mockRequest as Request,
      global.mockResponse as Response,
      global.nextFunction
    );
    expect(global.nextFunction).toBeCalledTimes(1);
    expect(global.mockRequest.currentUser).toEqual(
      expect.objectContaining(userJwt.payload)
    );

    const isAuthenticatedRes = new Promise((res, rej) =>
      setTimeout(() => {
        try {
          isAuthenticated(
            global.mockRequest as Request,
            global.mockResponse as Response,
            global.nextFunction
          );
          res(true);
        } catch (err) {
          rej(err);
        }
      }, 1200)
    );

    await expect(isAuthenticatedRes).rejects.toThrowError('jwt expired');
    expect(global.mockRequest.currentUser).toBeUndefined();
  });
});

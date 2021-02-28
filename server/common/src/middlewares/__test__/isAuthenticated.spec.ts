import { Request, Response } from 'express';
import { isAuthenticated } from '../';

describe('Authorization middleware', () => {
  it('should return 401 and authentication required message', () => {
    isAuthenticated(
      global.mockRequest as Request,
      global.mockResponse as Response,
      global.nextFunction
    );
    expect(global.mockResponse.status).toHaveBeenCalledWith(401);
    expect(global.nextFunction).toBeCalledTimes(0);
    expect(global.mockResponse.json).toBeCalledWith({
      message: 'sorry, authentication required'
    });
  });

  it('should pass without a response', () => {
    global.mockRequest = {
      currentUser: {
        _id: 'adadad',
        name: 'test',
        email: 'test@test.com'
      }
    };
    isAuthenticated(
      global.mockRequest as Request,
      global.mockResponse as Response,
      global.nextFunction
    );
    expect(global.nextFunction).toBeCalledTimes(1);
  });
});

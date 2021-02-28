import { NextFunction, Request, Response } from 'express';

declare global {
  namespace NodeJS {
    interface Global {
      mockRequest: Partial<Request>;
      mockResponse: Partial<Response>;
      nextFunction: NextFunction;
    }
  }
}

beforeEach(() => {
  global.mockRequest = {};
  global.mockResponse = {
    send: jest.fn(),
    json: jest.fn(),
    status: jest.fn(() => global.mockResponse)
  } as Partial<Response>;
  global.nextFunction = jest.fn();
});

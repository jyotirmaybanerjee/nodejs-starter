import { Request, Response, NextFunction } from 'express';
import { requestLogger } from '../requestLogger';
import logger from '../../utils/logger';

jest.mock('../../utils/logger');

describe('requestLogger middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      method: 'GET',
      originalUrl: '/test-url',
    };

    res = {};

    next = jest.fn();
  });

  it('should log the request method and URL', () => {
    // Call the middleware function
    requestLogger(req as Request, res as Response, next);

    // Check if the logger has logged the correct message
    expect(logger.info).toHaveBeenCalledWith('GET /test-url');

    // Ensure the next middleware is called
    expect(next).toHaveBeenCalled();
  });

  it('should call next without any issues', () => {
    // Call the middleware function
    requestLogger(req as Request, res as Response, next);

    // Ensure that the next function was called once
    expect(next).toHaveBeenCalled();
  });
});

import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../errorHandler';
import { AppError } from '../../utils/AppError';
import logger from '../../utils/logger';

jest.mock('../../utils/logger');

describe('errorHandler middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      method: 'GET',
      url: '/test',
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    next = jest.fn();
  });

  it('should handle AppError with custom status and message', () => {
    const err = new AppError('Not Found', 404);

    errorHandler(err, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Not Found',
      error: expect.any(String),
    });
  });

  it('should handle generic error with default 500 status', () => {
    const err = new Error('Something failed');

    errorHandler(err, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Something failed',
      error: process.env.NODE_ENV === 'development' ? expect.any(String) : undefined,
    });

    expect(logger.error).toHaveBeenCalledWith('[GET] /test - Something failed');
  });

  it('should handle error without message or statusCode gracefully', () => {
    const err = {};

    errorHandler(err, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Internal Server Error',
      error: process.env.NODE_ENV === 'development' ? expect.anything() : undefined,
    });
  });
});

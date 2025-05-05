import { Request, Response, NextFunction } from 'express';
import responseHandler from '../responseHandler';
import { successResponse, errorResponse } from '../../utils/response';

// Mocking successResponse and errorResponse
jest.mock('../../utils/response', () => ({
  successResponse: jest.fn().mockReturnValue({
    success: true,
    message: 'Success',
    data: {},
  }),
  errorResponse: jest.fn().mockReturnValue({
    success: false,
    message: 'Error',
    error: 'Some error details',
  }),
}));

describe('responseHandler middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
  });

  it('should define success and fail methods on the response object', () => {
    // Call the middleware function
    responseHandler(req as Request, res as Response, next);

    // Check if success and fail methods are available on the response object
    expect(typeof res.success).toBe('function');
    expect(typeof res.fail).toBe('function');
  });

  // it('should call successResponse with correct payload when success() is called', () => {
  //   // Prepare mock payload and statusCode
  //   const payload = { message: 'Success', data: { userId: 1 } };
  //   const statusCode = 200;

  //   // Call the success method
  //   (res.success as any)(payload, statusCode);

  //   // Check if successResponse was called with correct arguments
  //   expect(successResponse).toHaveBeenCalledWith(payload);
  //   // Check if the response was sent with the correct status and json
  //   expect(res.status).toHaveBeenCalledWith(statusCode);
  //   expect(res.json).toHaveBeenCalledWith({
  //     success: true,
  //     message: 'Success',
  //     data: {},
  //   });
  // });

  // it('should call errorResponse with correct payload when fail() is called', () => {
  //   // Prepare mock payload and statusCode
  //   const payload = { message: 'Error', errors: 'Some error details' };
  //   const statusCode = 500;

  //   // Call the fail method
  //   (res.fail as any)(payload, statusCode);

  //   // Check if errorResponse was called with correct arguments
  //   expect(errorResponse).toHaveBeenCalledWith(payload);
  //   // Check if the response was sent with the correct status and json
  //   expect(res.status).toHaveBeenCalledWith(statusCode);
  //   expect(res.json).toHaveBeenCalledWith({
  //     success: false,
  //     message: 'Error',
  //     error: 'Some error details',
  //   });
  // });

  it('should call next() to continue the middleware chain', () => {
    // Call the middleware function
    responseHandler(req as Request, res as Response, next);

    // Ensure next is called
    expect(next).toHaveBeenCalled();
  });
});

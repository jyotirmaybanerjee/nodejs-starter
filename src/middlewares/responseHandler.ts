/**
 * Middleware that ensures consistent response format
 * It formats the response as { success, message, data, error }
 */

import { successResponse, errorResponse } from '../utils/response';
import { Request, Response, NextFunction } from 'express';

export interface SuccessPayload {
  message: string;
  data?: any;
}

export interface ErrorPayload {
  message: string;
  errors?: any;
}

// Module augmentation to add custom methods to Express's Response
declare module 'express-serve-static-core' {
  interface Response {
    success: (payload: SuccessPayload, statusCode?: number) => Response;
    fail: (payload: ErrorPayload, statusCode?: number) => Response;
  }
}

const responseHandler = (req: Request, res: Response, next: NextFunction): void => {
  res.success = (payload: SuccessPayload, statusCode = 200): Response => {
    return res.status(statusCode).json(successResponse(payload));
  };

  res.fail = (payload: ErrorPayload, statusCode = 500): Response => {
    return res.status(statusCode).json(errorResponse(payload));
  };

  next();
};

export default responseHandler;


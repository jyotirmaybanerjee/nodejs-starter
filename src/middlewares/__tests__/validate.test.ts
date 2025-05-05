import { Request, Response, NextFunction } from 'express';
import { validate } from '../validate';
import { validationResult } from 'express-validator';

// Mocking validationResult from express-validator
jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

describe('validate middleware', () => {
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

  it('should return a 422 error with validation errors if validation fails', () => {
    // Mock validationResult to simulate validation errors
    const mockValidationErrors = {
      isEmpty: jest.fn().mockReturnValue(false),
      array: jest.fn().mockReturnValue([{ msg: 'Invalid email' }, { msg: 'Password is too short' }]),
    };

    // TypeScript requires us to cast `validationResult` as `jest.Mock`
    (validationResult as unknown as jest.Mock).mockReturnValue(mockValidationErrors);

    // Call the validate middleware
    validate(req as Request, res as Response, next);

    // Check if res.status and res.json are called with correct arguments
    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      errors: [
        { msg: 'Invalid email' },
        { msg: 'Password is too short' },
      ],
    });
    // Ensure that next() was not called because validation failed
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next() if there are no validation errors', () => {
    // Mock validationResult to simulate no validation errors
    const mockValidationErrors = {
      isEmpty: jest.fn().mockReturnValue(true),
      array: jest.fn().mockReturnValue([]),
    };

    // TypeScript requires us to cast `validationResult` as `jest.Mock`
    (validationResult as unknown as jest.Mock).mockReturnValue(mockValidationErrors);

    // Call the validate middleware
    validate(req as Request, res as Response, next);

    // Ensure next() was called because validation passed
    expect(next).toHaveBeenCalled();
  });
});

import { AppError } from '../AppError';

describe('AppError', () => {
  it('should create an instance of AppError with a custom message and statusCode', () => {
    const message = 'Something went wrong';
    const statusCode = 500;
    const error = new AppError(message, statusCode);

    // Check if the error is an instance of AppError
    expect(error).toBeInstanceOf(AppError);

    // Check if the message is set correctly
    expect(error.message).toBe(message);

    // Check if the statusCode is set correctly
    expect(error.statusCode).toBe(statusCode);

    // Check if the name is 'AppError'
    expect(error.name).toBe('AppError');

    // Check if the stack trace is captured
    expect(error.stack).toBeDefined();
  });

  it('should default statusCode to 400 if not provided', () => {
    const message = 'Bad Request';
    const error = new AppError(message);

    // Check if the statusCode is default to 400
    expect(error.statusCode).toBe(400);
  });

  it('should capture stack trace in development mode', () => {
    const message = 'Something went wrong';
    const error = new AppError(message);

    // Check if the stack trace is included (this will depend on the environment, ensure NODE_ENV is set to 'development' during test)
    if (process.env.NODE_ENV === 'development') {
      expect(error.stack).toBeDefined();
    }
  });
});

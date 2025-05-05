import 'express-serve-static-core';

declare module 'express-serve-static-core' {
  interface Response {
    success: (message: string, data?: any) => Response;
    error: (message: string, error?: any) => Response;
  }
}
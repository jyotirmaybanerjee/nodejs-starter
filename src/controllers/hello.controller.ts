import { Request, Response } from 'express';

/**
 * Handles the /hello route.
 */
export const sayHello = (req: Request, res: Response): void => {
  res.json({
    message: 'Hello, welcome to the API!',
  });
};

import { Request, Response } from 'express';

// Dummy list of users
const users = [
  { id: 1, username: 'admin', email: 'admin@example.com' },
  { id: 2, username: 'user', email: 'user@example.com' },
  { id: 3, username: 'guest', email: 'guest@example.com' },
];

// Correct: Return type should be void, don't return the Response object
export const getUsers = (req: Request, res: Response): void => {
  res.json({
    users,
  }); // No return here, just perform the action
};

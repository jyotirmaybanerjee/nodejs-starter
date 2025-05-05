import { Request, Response } from 'express';
import { AppError } from '../utils/AppError';
import { successResponse, errorResponse } from '../utils/response';
import { getAllUsers } from '../services/user.service';

export const getUsers = (req: Request, res: Response): void => {
  const users = getAllUsers();
  if (!users) {
    throw new AppError('User not found', 404);
  }
  try {
    // const users = await userService.getAllUsers();
    res.status(200).json(successResponse({message: 'Users retrieved', data: users}));
  } catch (err) {
    res.status(500).json(errorResponse({message: 'Failed to retrieve users', errors: err}));
  }

  res.json({
    users,
  });
};

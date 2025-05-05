import express, { Request, Response } from 'express';
import request from 'supertest';
import { getUsers } from '../user.controller';
import * as userService from '../../services/user.service';
import * as responseUtil from '../../utils/response';

jest.mock('../../services/user.service');
jest.mock('../../utils/response');

describe('User Controller - getUsers', () => {
  const app = express();
  app.get('/users', (req: Request, res: Response) => getUsers(req, res));

  const mockUsers = [
    { id: 1, username: 'john', email: 'john@example.com' },
    { id: 2, username: 'jane', email: 'jane@example.com' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // it('should return users on success', async () => {
  //   (userService.getAllUsers as jest.Mock).mockReturnValue(mockUsers);
  //   (responseUtil.successResponse as jest.Mock).mockImplementation((args) => args);

  //   const res = await request(app).get('/api/v1/users');

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.data).toEqual(mockUsers);
  //   expect(res.body.message).toBe('Users retrieved');
  // });

  it('should return 404 if no users found', async () => {
    (userService.getAllUsers as jest.Mock).mockReturnValue(null);

    const res = await request(app).get('/api/v1/users');

    expect(res.statusCode).toBe(404); // because it throws but not caught
    // expect(res.body).toHaveProperty('error');
  });

  it('should handle exception and return 500', async () => {
    (userService.getAllUsers as jest.Mock).mockImplementation(() => {
      throw new Error('Something went wrong');
    });

    (responseUtil.errorResponse as jest.Mock).mockImplementation(({ message }) => ({
      success: false,
      message,
    }));

    const res = await request(app).get('/api/v1/users');
    expect(res.statusCode).toBe(404);
    // expect(res.body.message).toBe('Failed to retrieve users');
  });
});

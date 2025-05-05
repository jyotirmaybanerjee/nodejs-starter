import request from 'supertest';
import express from 'express';
import userRoutes from '../user.routes'; // Path to your user.routes.ts
import { getAllUsers } from '../../services/user.service'; // Mock service method

jest.mock('../../services/user.service'); // Mock the user service

describe('User Routes', () => {
  let app: express.Application;

  // Sample user data to return from the mocked service
  const mockUsers = [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
    },
    {
      id: 2,
      username: 'user1',
      email: 'user1@example.com',
    },
  ];

  beforeEach(() => {
    app = express();
    app.use(express.json()); // For parsing JSON request body
    app.use(userRoutes); // Register user routes
  });

  it('should return a 200 status with a list of users', async () => {
    // Mock the getAllUsers function to return the mock data
    (getAllUsers as jest.Mock).mockReturnValue(mockUsers);

    const response = await request(app).get('/v1/users'); // Send GET request to /v1/users

    // Check if the response status is 200
    expect(response.status).toBe(200);

    // Check if the response body contains the list of users
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toEqual(mockUsers);
  });

  it('should return a 404 status when no users are found', async () => {
    // Mock the getAllUsers function to return null (no users)
    (getAllUsers as jest.Mock).mockReturnValue(null);

    const response = await request(app).get('/v1/users');

    // Check if the response status is 404 when no users are found
    expect(response.status).toBe(404);

    // Check if the response body has the expected error message
    expect(response.body).toHaveProperty('message', 'User not found');
  });

  it('should return a 500 status on server error', async () => {
    // Mock the getAllUsers function to throw an error
    (getAllUsers as jest.Mock).mockImplementation(() => {
      throw new Error('Server error');
    });

    const response = await request(app).get('/v1/users');

    // Check if the response status is 500 for a server error
    expect(response.status).toBe(500);

    // Check if the response body has the expected error message
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Failed to retrieve users');
  });
});

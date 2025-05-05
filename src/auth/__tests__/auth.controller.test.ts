import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

// Import the login function
import { login } from '../auth.controller';

// Mock dependencies
jest.mock('../../services/user.service', () => ({
  authenticateUser: jest.fn((username: string, password: string) => {
    if (username === 'testuser' && password === 'testpass') {
      return { id: 1, username: 'testuser' };
    }
    return null;
  }),
}));

const app = express();
app.use(bodyParser.json());
app.post('/login', login);

describe('POST /login', () => {
  it('should return token for valid credentials', async () => {
    const res = await request(app).post('/login').send({
      username: 'testuser',
      password: 'testpass',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');

    const decoded = jwt.decode(res.body.token) as { username: string };
    expect(decoded.username).toBe('testuser');
  });

  it('should return 401 for invalid credentials', async () => {
    const res = await request(app).post('/login').send({
      username: 'wrong',
      password: 'creds',
    });

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toBe('Invalid credentials');
  });
});

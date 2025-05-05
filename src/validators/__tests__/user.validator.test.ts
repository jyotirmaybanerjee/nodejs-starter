import request from 'supertest';
import express, { Request, Response } from 'express'; // Import Request and Response
import { loginValidator } from '../user.validator'; // Adjust the import based on your actual path
import { validationResult } from 'express-validator';

const app = express();

// Middleware to test the validation
app.use(express.json());
app.post('/login', loginValidator, (req: Request, res: Response): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
  }
  res.status(200).json({ message: 'Login successful' });
});

describe('Login Validator Middleware', () => {
  it('should pass when valid username and password are provided', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
  });

  it('should return an error when username is missing', async () => {
    const response = await request(app)
      .post('/login')
      .send({ password: 'password123' });

    expect(response.status).toBe(422);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('Username is required');
  });

  it('should return an error when password is missing', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'admin' });

    expect(response.status).toBe(422);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('Password is required');
  });

  it('should return an error when both username and password are missing', async () => {
    const response = await request(app)
      .post('/login')
      .send({});

    expect(response.status).toBe(422);
    expect(response.body.errors).toHaveLength(2); // Both username and password should be missing
    expect(response.body.errors[0].msg).toBe('Username is required');
    expect(response.body.errors[1].msg).toBe('Password is required');
  });
});

import request from 'supertest';
import express, { Request, Response } from 'express';
import { sayHello } from '../hello.controller';

const app = express();
app.get('/hello', (req: Request, res: Response) => sayHello(req, res));

describe('sayHello Controller', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/hello');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: 'Hello, welcome to the API!',
    });
  });
});

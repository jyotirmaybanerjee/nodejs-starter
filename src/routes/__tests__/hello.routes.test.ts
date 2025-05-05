import request from 'supertest';
import express from 'express';
import helloRoutes from '../hello.routes'; // Path to your hello.routes.ts

describe('Hello Routes', () => {
  let app: express.Application;

  // Before each test, initialize a fresh express app with the hello routes
  beforeEach(() => {
    app = express();
    app.use(helloRoutes); // Register the helloRoutes with the app
  });

  it('should return a 200 status with a hello message', async () => {
    const response = await request(app).get('/v1/hello'); // Send GET request to /v1/hello

    // Check if the response status is 200
    expect(response.status).toBe(200);

    // Check if the response body matches the expected format
    expect(response.body).toHaveProperty('message', 'Hello, welcome to the API!');
  });
});

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { authenticate } from '../auth.middleware';

const SECRET = 'test-secret';
process.env.JWT_SECRET = SECRET;

describe('authenticate middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: jest.Mock;

  beforeEach(() => {
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return 401 if no Authorization header', () => {
    authenticate(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token required' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', () => {
    req.headers = { authorization: 'Bearer invalid.token' };

    authenticate(req as Request, res as Response, next as NextFunction);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should call next and attach user if token is valid', () => {
    const user = { id: 1, username: 'test' };
    const token = jwt.sign(user, SECRET);

    req.headers = { authorization: `Bearer ${token}` };

    authenticate(req as Request, res as Response, next as NextFunction);

    expect((req as any).user).toMatchObject(user);
    expect(next).toHaveBeenCalled();
  });
});

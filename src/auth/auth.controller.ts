import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authenticateUser } from '../services/user.service';
import { errorResponse } from '../utils/response';

const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  const user = authenticateUser(username, password);
  if (!user) {
    res.status(401).json(errorResponse({message: 'Invalid credentials'}));
    return;
  }
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' });
  res.status(200).json({ token });
};

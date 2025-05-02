import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'secret';

export const login = (req: Request, res: Response): void => {
  const { username, password } = req.body;

  // Dummy validation (replace with DB lookup in real use)
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

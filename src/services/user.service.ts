import { User } from '../models/user.model';

const users: User[] = [
  {
    id: 1,
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin', // dummy password for login
  },
  {
    id: 2,
    username: 'user',
    email: 'user@example.com',
    password: 'user',
  },
];

// Service to fetch all users (excluding password)
export const getAllUsers = (): Omit<User, 'password'>[] => {
  return users.map(({ password, ...user }) => user);
};

// Service to authenticate user by username/password
export const authenticateUser = (
  username: string,
  password: string
): Omit<User, 'password'> | null => {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return null;

  const { password: _, ...safeUser } = user;
  return safeUser;
};

import { getAllUsers, authenticateUser } from '../user.service'; // Path to the user service
import { User } from '../../models/user.model'; // Import the User model

// Sample user data
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

describe('User Service', () => {
  describe('getAllUsers', () => {
    it('should return all users excluding passwords', () => {
      const result = getAllUsers();
      // Check if the result is an array of users without passwords
      expect(result).toEqual([
        { id: 1, username: 'admin', email: 'admin@example.com' },
        { id: 2, username: 'user', email: 'user@example.com' },
      ]);
    });
  });

  describe('authenticateUser', () => {
    it('should authenticate the user with correct username and password', () => {
      const result = authenticateUser('admin', 'admin');
      expect(result).toEqual({
        id: 1,
        username: 'admin',
        email: 'admin@example.com',
      });
    });

    it('should return null if username is incorrect', () => {
      const result = authenticateUser('wrongUsername', 'admin');
      expect(result).toBeNull();
    });

    it('should return null if password is incorrect', () => {
      const result = authenticateUser('admin', 'wrongPassword');
      expect(result).toBeNull();
    });

    it('should return null if both username and password are incorrect', () => {
      const result = authenticateUser('wrongUsername', 'wrongPassword');
      expect(result).toBeNull();
    });
  });
});

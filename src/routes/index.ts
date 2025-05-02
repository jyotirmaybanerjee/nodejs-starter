import { Router } from 'express';
import { loginValidator } from '../validators/user.validator';
import { validate } from '../middlewares/validate';
import { login } from '../auth/auth.controller';
import helloRoutes from './hello.routes';
import userRoutes from './user.routes';

const router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check route
 *     responses:
 *       200:
 *         description: API is working
 */
router.get('/', (_, res) => {
  res.json({ message: 'API is working with TypeScript!' });
});

export { helloRoutes, userRoutes };

router.post('/login', loginValidator, validate, login);

export default router;

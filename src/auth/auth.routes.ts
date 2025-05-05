import { Router } from 'express';
import { login } from './auth.controller';
import { loginValidator } from '../validators/user.validator';
import { validate } from '../middlewares/validate';

const router = Router();

/**
 * @swagger
 * /v1/login:
 *   post:
 *     summary: Log in and get a JWT token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: JWT token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       401:
 *         description: Invalid credentials
 *       422:
 *         description: Validation error
 */
router.post('/v1/login', loginValidator, validate, login);

export default router;

import { Router } from 'express';
import { sayHello } from '../controllers/hello.controller';

const router = Router();

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Return a hello world message
 *     tags: [Hello]
 *     responses:
 *       200:
 *         description: A hello world message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, welcome to the API!"
 */
router.get('/hello', sayHello);

export default router;

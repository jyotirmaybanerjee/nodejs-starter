import { Router } from 'express';
import { getUsers } from '../controllers/user.controller';

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve the list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       username:
 *                         type: string
 *                         example: admin
 *                       email:
 *                         type: string
 *                         example: admin@example.com
 */
router.get('/users', getUsers);

export default router;

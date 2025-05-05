import express, { Application } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import rateLimit from 'express-rate-limit';

import routes, { helloRoutes, userRoutes } from './routes';
import logger from './utils/logger';
import { requestLogger } from './middlewares/requestLogger';
import { errorHandler } from './middlewares/errorHandler';
import responseHandler from './middlewares/responseHandler';
import swaggerSpec from './utils/swagger';
import authRoutes from './auth/auth.routes';

const corsOptions = {
  origin: 'https://your-frontend-domain.com',
  methods: ['GET', 'POST'],
};


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(helmet());
app.use(compression());
// app.use(cors());
app.use(cors(corsOptions));
app.use(requestLogger);
app.use(limiter);
app.use(responseHandler); // Add the response handler middleware

app.use('/api/auth', authRoutes);
app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.get('/health', (req, res) => res.send('OK'));

app.get('/', (_, res) => {
  res.json({ message: 'please hit /api' });
});
app.use('/api', routes);
app.use('/api', helloRoutes);
app.use('/api', userRoutes);

app.get('/example', (req, res) => {
  res.success({ message: 'Data fetched', data: { id: 1 } });
});

app.get('/fail', (req, res) => {
  res.fail({ message: 'Something failed', errors: { reason: 'Unknown' } });
});

app.use(errorHandler);  // Always put after all the routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

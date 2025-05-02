import express, { Application } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import { helloRoutes, userRoutes } from './routes'; 
import logger from './utils/logger';
import { requestLogger } from './middlewares/requestLogger';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './utils/swagger';
import authRoutes from './auth/auth.routes';

dotenv.config();

const app: Application = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use('/api/auth', authRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', helloRoutes);
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

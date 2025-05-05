import swaggerJsDoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';
import { SwaggerSpec } from '../types/swagger';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API Boilerplate',
      version: '1.0.0',
      description: 'Production-ready Node.js API with Swagger, TypeScript, JWT auth and validation',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/auth/*.ts'],
};

const swaggerSpec: SwaggerSpec = swaggerJsDoc(options) as SwaggerSpec;
export default swaggerSpec;

import * as express from 'express';
const router = express.Router();

import * as swaggerJSDoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'A.D.I.A. Finance API',
        version: '1.0.0'
    }
};

const swaggerOptions = {
    swaggerDefinition,
    apis: [
        './routes/*.js',
        './dist/routes/*.js'
    ]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;

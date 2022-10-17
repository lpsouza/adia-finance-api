import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import expressJSDocSwagger from 'express-jsdoc-swagger';
import { DB } from './database/DB';

import { Authentication } from './middleware/Authentication';
import { Authorization } from './middleware/Authorization';

import routerIndex from './routes/index';
import routerOfx from './routes/ofx';
import routerWallets from './routes/wallets';
import routerEntries from './routes/entries';

const db = DB.getInstance();
const app: express.Application = express();

db.start();
app.use(express.json());
app.use(morgan('combined'));
app.use(fileUpload({ createParentPath: true }));
if (process.env.NODE_ENV === 'development') {
    app.use(cors());
}

app.use('/', routerIndex);
app.use('/ofx', Authentication, Authorization, routerOfx);
app.use('/wallets', Authentication, Authorization, routerWallets);
app.use('/entries', Authentication, Authorization, routerEntries);

const options = {
    info: {
        version: '1.0.0',
        title: 'Test',
    },
    baseDir: __dirname,
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: './**/*.js',
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/docs',
    // Expose OpenAPI UI
    exposeSwaggerUI: true,
    // Expose Open API JSON Docs documentation in `apiDocsPath` path.
    exposeApiDocs: false,
    // Open API JSON Docs endpoint.
    apiDocsPath: '/api-docs',
    // Set non-required fields as nullable by default
    notRequiredAsNullable: false,
    // You can customize your UI options.
    // you can extend swagger-ui-express config. You can checkout an example of this
    // in the `example/configuration/swaggerOptions.js`
    swaggerUiOptions: {},
    // multiple option in case you want more that one instance
    multiple: true,
};

expressJSDocSwagger(app)(options);

export default app;

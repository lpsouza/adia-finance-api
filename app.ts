import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import { DB } from './database/DB';
import { Auth } from './middleware/Auth';

import routerIndex from './routes/index';
import routerOfx from './routes/ofx';
import routerWallets from './routes/wallets';
import routerEntries from './routes/entries';
import routerTransactions from './routes/transactions';

import * as swaggerOptions from './swagger.json';
import expressJSDocSwagger from 'express-jsdoc-swagger';

const db = DB.getInstance();
const app: express.Application = express();

db.start();
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'));
}
app.use(fileUpload({ createParentPath: true }));
if (process.env.NODE_ENV === 'development') {
    app.use(cors());
}

app.use('/', routerIndex);
app.use('/ofx', Auth, routerOfx);
app.use('/wallets', Auth, routerWallets);
app.use('/entries', Auth, routerEntries);
app.use('/transactions', Auth, routerTransactions);

expressJSDocSwagger(app)(swaggerOptions);

export default app;

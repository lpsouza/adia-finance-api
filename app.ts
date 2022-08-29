import * as express from 'express';
import * as morgan from 'morgan';
import * as fileUpload from 'express-fileupload';
import * as cors from 'cors';
import { DB } from './database/DB';

import { Authentication } from './middleware/Authentication';
import { Authorization } from './middleware/Authorization';

import routerIndex from './routes/index';
import routerDocs from './routes/docs';
import routerOfx from './routes/ofx';
import routerWallets from './routes/wallets';

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
app.use('/docs', routerDocs);
app.use('/ofx', Authentication, Authorization, routerOfx);
app.use('/wallets', Authentication, Authorization, routerWallets);

export default app;

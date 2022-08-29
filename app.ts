import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import { DB } from './database/DB';

import routerIndex from './routes/index';
import routerDocs from './routes/docs';

const db = DB.getInstance();
const app: express.Application = express();

db.start();
app.use(express.json());
app.use(morgan('combined'));

if (process.env.NODE_ENV === 'development') {
    app.use(cors());
}

app.use('/', routerIndex);
app.use('/docs', routerDocs);

export default app;

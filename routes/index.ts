import * as express from 'express';
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response, next: Function): void => {
    res.status(200).send('Welcome to the A.D.I.A finance API.');
});

export default router;

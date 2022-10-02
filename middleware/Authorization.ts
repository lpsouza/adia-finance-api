import * as express from 'express';

export const Authorization = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (['development', 'test'].includes(process.env.NODE_ENV)) {
        next()
        return;
    }
    const user = res.locals.user;
    const app = res.locals.app;
    if (user) {
        if (user.role === 'owner') {
            next();
        } else {
            res.status(403).send('Forbidden');
            return;
        }
    } else if (app) {
        next();
    }
}

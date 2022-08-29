import * as express from 'express';
import CoreService from '../services/CoreService';

export const Authentication = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        const appId = req.headers['X-App-Id'] as string;
        const appToken = req.headers['X-App-Token'] as string;
        if (!appId || !appToken) {
            res.status(401).send('Unauthorized');
            return;
        }

        const app = await CoreService.apps.get(appId);
        if (!app) {
            res.status(401).send('Unauthorized');
            return;
        }

        const appInfo: any = app.data;
        if (appInfo.token === appToken) {
            res.locals.app = appInfo;
            next();
            return;
        }

        res.status(401).send('Unauthorized');
        return;
    }

    try {
        const tokenInfo = await CoreService.auth.token(token);
        const user = await CoreService.users.get(tokenInfo.data.email);
        res.locals.user = user.data;
    } catch (error) {
        res.status(401).send("Unauthorized");
        return;
    }

    next();
}

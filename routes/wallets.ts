import * as express from 'express';
const router = express.Router();

import { Wallet } from '../database/models/Wallet';

router.get('/', async (req: express.Request, res: express.Response, next: Function) => {
    const wallets = await Wallet.find();
    if (wallets) {
        res.status(200).json(wallets);
    } else {
        res.status(404).send('No wallets found');
    }
});

router.get('/:id', async (req: express.Request, res: express.Response) => {
    const wallet = await Wallet.findOne({ _id: req.params.id });
    if (wallet) {
        res.status(200).json(wallet);
    } else {
        res.status(404).send('No wallet found');
    }
});

router.post('/', async (req: express.Request, res: express.Response) => {
    const wallet = new Wallet(req.body);
    wallet.balance = !wallet.balance ? 0 : wallet.balance;
    wallet.balanceDate = !wallet.balanceDate ? new Date('1900-01-01') : wallet.balanceDate;
    const created = await wallet.save();
    if (created) {
        res.status(201).json(created);
    } else {
        res.status(404).send('No wallet created');
    }
});

router.put('/:id', async (req: express.Request, res: express.Response) => {
    const wallet = await Wallet.findOne({ _id: req.params.id });
    if (wallet) {
        wallet.name = req.body.name;
        wallet.type = req.body.type;
        wallet.user = req.body.user;
        wallet.balance = req.body.balance;
        wallet.balanceDate = req.body.dateBalance;
        wallet.bankId = req.body.bankId;
        wallet.enabled = req.body.enabled;
        const updated = await wallet.save();
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(400).send('No wallet updated');
        }
    } else {
        res.status(404).send('No wallet found');
    }
});

router.delete('/:id', async (req: express.Request, res: express.Response) => {
    const wallet = await Wallet.findOneAndDelete({ _id: req.params.id });
    if (wallet) {
        res.status(200).send('Wallet deleted');
    } else {
        res.status(404).send('No wallet found');
    }
});

export default router;

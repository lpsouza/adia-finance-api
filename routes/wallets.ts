import * as express from 'express';
import { Entry } from '../database/models/Entry';
import { Transaction } from '../database/models/Transaction';
const router = express.Router();

import { Wallet } from '../database/models/Wallet';

/**
 * GET /wallets
 * @summary Get all wallets
 * @tags wallet
 * @return {array<Wallet>} 200 - success response - application/json
 */
router.get('/', async (req: express.Request, res: express.Response, next: Function) => {
    try {
        const wallets = await Wallet.find();
        res.status(200).json(wallets);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

/**
 * GET /wallets/{id}
 * @summary Get a wallet
 * @tags wallet
 * @param {string} id.path
 * @return {Wallet} 200 - success response - application/json
 * @return {string} 404 - error response - string
 */
router.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const wallet = await Wallet.findOne({ _id: req.params.id });
        res.status(200).json(wallet);
    } catch (error) {
        res.status(404).send('No wallet found');

    }
});

/**
 * GET /wallets/{id}/entries
 * @summary Get the entries for a wallet
 * @tags wallet
 * @param {string} id.path
 * @return {array<Entry>} 200 - success response - application/json
 * @return {string} 404 - error response - string
 */
router.get('/:id/entries/', async (req: express.Request, res: express.Response) => {
    try {
        const entries = await Entry.find({ walletId: req.params.id });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

/**
 * GET /wallets/{id}/transactions
 * @summary Get the transactions for a wallet
 * @tags wallet
 * @param {string} id.path
 * @return {array<Transaction>} 200 - success response - application/json
 * @return {string} 404 - error response - string
 */
router.get('/:id/transactions/', async (req: express.Request, res: express.Response) => {
    try {
        const transactions = await Transaction.find({ walletId: req.params.id });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

/**
 * POST /wallets
 * @summary Create a new wallet
 * @tags wallet
 * @param {Wallet} request.body.required - Wallet object - application/json
 * @return {Wallet} 200 - success response - application/json
 * @return {string} 404 - error response - string
 */
router.post('/', async (req: express.Request, res: express.Response) => {
    const wallet = new Wallet(req.body);
    const created = await wallet.save();
    if (created) {
        res.status(201).json(created);
    } else {
        res.status(404).send('No wallet created');
    }
});

/**
 * PUT /wallets/{id}
 * @summary Edit a wallet
 * @tags wallet
 * @param {string} id.path
 * @param {Wallet} request.body.required - Wallet object - application/json
 * @return {Wallet} 200 - success response - application/json
 * @return {string} 404 - error response - string
 */
router.put('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const wallet = await Wallet.findOne({ _id: req.params.id });
        wallet.name = !req.body.name ? wallet.name : req.body.name;
        wallet.type = !req.body.type ? wallet.type : req.body.type;
        wallet.user = !req.body.user ? wallet.user : req.body.user;
        wallet.bankId = !req.body.bankId ? wallet.bankId : req.body.bankId;
        wallet.enabled = !req.body.enabled ? wallet.enabled : req.body.enabled;
        const updated = await wallet.save();
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(400).send('No wallet updated');
        }
    } catch (error) {
        res.status(404).send('No wallet found');
    }
});

/**
 * DELETE /wallets/{id}
 * @summary Get a wallet
 * @tags wallet
 * @param {string} id.path
 * @return {Wallet} 200 - success response - application/json
 * @return {string} 404 - error response - string
 */
router.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        await Wallet.findOneAndDelete({ _id: req.params.id });
        res.status(200).send('Wallet deleted');
    } catch (error) {
        res.status(404).send('No wallet found');
    }
});

export default router;

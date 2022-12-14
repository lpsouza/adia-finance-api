import * as express from 'express';
const router = express.Router();
import axios from 'axios';

import { Wallet } from '../database/models/Wallet';
import { Entry } from '../database/models/Entry';
import { Transaction } from '../database/models/Transaction';

/**
 * GET /wallets
 * @summary Get all wallets
 * @tags Wallets
 * @return {array<Wallet>} 200 - success response - application/json
 * @security BearerAuth
 */
router.get('/', async (req: express.Request, res: express.Response, next: Function) => {
    try {
        const wallets = await Wallet.find();
        res.status(200).json(wallets);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * GET /wallets/{id}
 * @summary Get a wallet
 * @tags Wallets
 * @param {string} id.path
 * @return {Wallet} 200 - success response - application/json
 * @return {string} 404 - error response - string
 * @security BearerAuth
 */
router.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const wallet = await Wallet.findOne({ _id: req.params.id });
        res.status(200).json(wallet);
    } catch (error) {
        res.status(404).json({ message: 'No wallet found' });

    }
});

/**
 * GET /wallets/{id}/entries
 * @summary Get the entries for a wallet
 * @tags Wallets
 * @param {string} id.path
 * @return {array<Entry>} 200 - success response - application/json
 * @return {string} 500 - error response - string
 * @security BearerAuth
 */
router.get('/:id/entries/', async (req: express.Request, res: express.Response) => {
    try {
        const entries = await Entry.find({ walletId: req.params.id });
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * GET /wallets/{id}/transactions
 * @summary Get the transactions for a wallet
 * @tags Wallets
 * @param {string} id.path
 * @return {array<Transaction>} 200 - success response - application/json
 * @return {string} 500 - error response - string
 * @security BearerAuth
 */
router.get('/:id/transactions/', async (req: express.Request, res: express.Response) => {
    try {
        const transactions = await Transaction.find({ walletId: req.params.id });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

/**
 * POST /wallets
 * @summary Create a new wallet
 * @tags Wallets
 * @param {Wallet} request.body.required - Wallet object - application/json
 * @return {Wallet} 200 - success response - application/json
 * @return {string} 404 - error response - string
 * @security BearerAuth
 */
router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const wallet = new Wallet(req.body);
        wallet.bankName = (await axios.get(`https://brasilapi.com.br/api/banks/v1/${wallet.bankId}`)).data.name || "Unknown"
        wallet.enabled = true;
        const created = await wallet.save();
        res.status(201).json(created);
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' });
    }
});

/**
 * PUT /wallets/{id}
 * @summary Edit a wallet
 * @tags Wallets
 * @param {string} id.path
 * @param {Wallet} request.body.required - Wallet object - application/json
 * @return {Wallet} 200 - success response - application/json
 * @return {string} 404 - error response - string
 * @security BearerAuth
 */
router.put('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const wallet = await Wallet.findOne({ _id: req.params.id });
        wallet.type = !req.body.type ? wallet.type : req.body.type;
        wallet.user = !req.body.user ? wallet.user : req.body.user;
        wallet.bankId = !req.body.bankId ? wallet.bankId : req.body.bankId;
        wallet.bankName = (await axios.get(`https://brasilapi.com.br/api/banks/v1/${wallet.bankId}`)).data.name || "Unknown"
        wallet.enabled = typeof req.body.enabled === 'boolean' ? req.body.enabled : wallet.enabled;
        const updated = await wallet.save();
        if (updated) {
            res.status(200).json(updated);
        } else {
            res.status(400).json({ message: 'Bad Request' });
        }
    } catch (error) {
        res.status(404).json({ message: 'No wallet found' });
    }
});

/**
 * DELETE /wallets/{id}
 * @summary Get a wallet
 * @tags Wallets
 * @param {string} id.path
 * @return {Wallet} 200 - success response - application/json
 * @return {string} 404 - error response - string
 * @security BearerAuth
 */
router.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        await Wallet.findOneAndDelete({ _id: req.params.id });
        await Entry.deleteMany({ walletId: req.params.id });
        await Transaction.deleteMany({ walletId: req.params.id });
        res.status(200).json({ message: 'Wallet deleted' });
    } catch (error) {
        res.status(404).json({ message: 'No wallet found' });
    }
});

export default router;

import * as express from 'express';
const router = express.Router();

import { Transaction } from '../database/models/Transaction';

/**
 * GET /transactions
 * @summary Get all transactions
 * @tags Transactions
 * @return {array<Transaction>} 200 - success response - application/json
 * @security BearerAuth
 */
router.get('/', async (req: express.Request, res: express.Response, next: Function) => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

/**
 * GET /transactions/{id}
 * @summary Get a transaction
 * @tags Transactions
 * @param {string} id.path
 * @return {Transaction} 200 - success response - application/json
 * @return {string} 404 - error response - string
 * @security BearerAuth
 */
router.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id });
        res.status(200).json(transaction);
    } catch (error) {
        res.status(404).send('No transaction found');

    }
});

/**
 * POST /transactions
 * @summary Create a new transaction
 * @tags Transactions
 * @param {Transaction} request.body.required - Transaction object - application/json
 * @return {Transaction} 200 - success response - application/json
 * @return {string} 404 - error response - string
 * @security BearerAuth
 */
router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const transaction = new Transaction(req.body);
        const created = await transaction.save();
        res.status(201).json(created);
    } catch (error) {
        res.status(404).send('No transaction created');
    }
});

/**
 * PUT /transactions/{id}
 * @summary Edit a transaction
 * @tags Transactions
 * @param {string} id.path
 * @param {Transaction} request.body.required - Transaction object - application/json
 * @return {Transaction} 200 - success response - application/json
 * @return {string} 404 - error response - string
 * @security BearerAuth
 */
router.put('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const transaction = await Transaction.findOne({ _id: req.params.id });
        transaction.type = !req.body.type ? transaction.type : req.body.type;
        transaction.date = !req.body.date ? transaction.date : req.body.date;
        transaction.amount = !req.body.amount ? transaction.amount : req.body.amount;
        transaction.transactionId = !req.body.transactionId ? transaction.transactionId : req.body.transactionId;
        transaction.walletId = !req.body.walletId ? transaction.walletId : req.body.walletId;
        transaction.description = !req.body.description ? transaction.description : req.body.description;
        transaction.customDescription = !req.body.customDescription ? transaction.customDescription : req.body.customDescription;
        transaction.tags = !req.body.tags ? transaction.tags : req.body.tags;
        await Transaction.findByIdAndUpdate({ _id: transaction._id }, transaction);
        res.status(200).json(transaction);
    } catch (error) {
        res.status(404).send('No transaction found');
    }
});

/**
 * DELETE /transactions/{id}
 * @summary Get a transaction
 * @tags Transactions
 * @param {string} id.path
 * @return {Transaction} 200 - success response - application/json
 * @return {string} 404 - error response - string
 * @security BearerAuth
 */
router.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        await Transaction.findOneAndDelete({ _id: req.params.id });
        res.status(200).send('Transaction deleted');
    } catch (error) {
        res.status(404).send('No transaction found');
    }
});

export default router;

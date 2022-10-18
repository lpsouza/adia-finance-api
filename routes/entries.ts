import * as express from 'express';
const router = express.Router();

import { Entry } from '../database/models/Entry';

/**
 * GET /entries
 * @summary Get all entries
 * @tags Entries
 * @return {array<Entry>} 200 - success response - application/json
 * @security BearerAuth
 */
router.get('/', async (req: express.Request, res: express.Response, next: Function) => {
    try {
        const entries = await Entry.find();
        res.status(200).json(entries);
    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
});

/**
 * GET /entries/{id}
 * @summary Get a entry
 * @tags Entries
 * @param {string} id.path
 * @return {Entry} 200 - success response - application/json
 * @return {string} 404 - error response - string
 * @security BearerAuth
 */
router.get('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const entry = await Entry.findOne({ _id: req.params.id });
        res.status(200).json(entry);
    } catch (error) {
        res.status(404).send('No entry found');

    }
});

/**
 * POST /entries
 * @summary Create a new entry
 * @tags Entries
 * @param {Entry} request.body.required - Entry object - application/json
 * @return {Entry} 200 - success response - application/json
 * @return {string} 404 - error response - string
 * @security BearerAuth
 */
router.post('/', async (req: express.Request, res: express.Response) => {
    try {
        const entry = new Entry(req.body);
        const created = await entry.save();
        res.status(201).json(created);
    } catch (error) {
        res.status(404).send('No entry created');
    }
});

/**
 * PUT /entries/{id}
 * @summary Edit a entry
 * @tags Entries
 * @param {string} id.path
 * @param {Entry} request.body.required - Entry object - application/json
 * @return {Entry} 200 - success response - application/json
 * @return {string} 404 - error response - string
 * @security BearerAuth
 */
router.put('/:id', async (req: express.Request, res: express.Response) => {
    try {
        const entry = await Entry.findOne({ _id: req.params.id });
        entry.balance = !req.body.balance ? entry.balance : req.body.balance;
        entry.balanceDate = !req.body.balanceDate ? entry.balanceDate : req.body.balanceDate;
        entry.walletId = !req.body.walletId ? entry.walletId : req.body.walletId;
        await Entry.findByIdAndUpdate({ _id: entry._id }, entry);
        res.status(200).json(entry);
    } catch (error) {
        res.status(404).send('No entry found');
    }
});

/**
 * DELETE /entries/{id}
 * @summary Get a entry
 * @tags Entries
 * @param {string} id.path
 * @return {Entry} 200 - success response - application/json
 * @return {string} 404 - error response - string
 * @security BearerAuth
 */
router.delete('/:id', async (req: express.Request, res: express.Response) => {
    try {
        await Entry.findOneAndDelete({ _id: req.params.id });
        res.status(200).send('Entry deleted');
    } catch (error) {
        res.status(404).send('No entry found');
    }
});

export default router;

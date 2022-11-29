import * as express from 'express';
const router = express.Router();

import * as banking from 'banking';

import { UploadedFile } from 'express-fileupload';
import { Wallet } from '../database/models/Wallet';
import { Entry } from '../database/models/Entry';
import { Transaction } from '../database/models/Transaction';


router.post('/importer', (req: express.Request, res: express.Response, next: Function): void => {
    const ofxFile = req.files.ofxFile as UploadedFile;
    const walletId = req.body.walletId;

    if (!ofxFile || !walletId) {
        res.status(400).send("Bad request");
        return;
    }

    banking.parse(ofxFile.data.toString('utf8'), async (ofx: any) => {
        const wallet = await Wallet.findById(walletId);
        if (!wallet) {
            res.status(404).send("Wallet not found");
            return;
        }

        try {
            let transactions: any[];
            let balance: any;

            switch (wallet.type) {
                case "bank":
                    transactions = ofx.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.BANKTRANLIST.STMTTRN;
                    balance = ofx.body.OFX.BANKMSGSRSV1.STMTTRNRS.STMTRS.LEDGERBAL;
                    break;

                case "creditcard":
                    transactions = ofx.body.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.BANKTRANLIST.STMTTRN;
                    balance = ofx.body.OFX.CREDITCARDMSGSRSV1.CCSTMTTRNRS.CCSTMTRS.LEDGERBAL;
                    break;

                default:
                    break;
            }

            const balanceDate = new Date([balance.DTASOF.substring(0, 4), balance.DTASOF.substring(4, 6), balance.DTASOF.substring(6, 8)].join('-'))

            let entry = await Entry.findOne({
                balanceDate: {
                    $gte: new Date(balanceDate.getFullYear(), balanceDate.getMonth(), 1),
                    $lt: new Date(balanceDate.getFullYear(), balanceDate.getMonth() + 1, 0)
                }
            });
            if (entry) {
                entry.balance = balance.BALAMT;
                entry.balanceDate = balanceDate;
                entry.walletId = walletId;
                await Entry.updateOne({ _id: entry._id }, entry);
            } else {
                entry = new Entry({
                    balance: balance.BALAMT,
                    balanceDate: balanceDate,
                    walletId: walletId
                });
                await entry.save();
            }

            await Transaction.deleteMany({ walletId });
            transactions.forEach(async t => {
                const transaction = new Transaction({
                    type: t.TRNTYPE,
                    date: new Date([t.DTPOSTED.substring(0, 4), t.DTPOSTED.substring(4, 6), t.DTPOSTED.substring(6, 8)].join('-')),
                    amount: t.TRNAMT,
                    transactionId: t.FITID,
                    description: t.MEMO,
                    walletId
                });
                await transaction.save();
            });
            res.status(200).send("Import success");
        } catch (error) {
            res.status(500).send("Error importing");
        }
    });
});

export default router;

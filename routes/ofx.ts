import * as express from 'express';
import * as banking from 'banking';
import { UploadedFile } from 'express-fileupload';
import { ITransaction } from '../database/interfaces/ITransaction';
import { Wallet } from '../database/models/Wallet';
const router = express.Router();

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

        const ofxBalanceDate = new Date([balance.DTASOF.substring(0, 4), balance.DTASOF.substring(4, 6), balance.DTASOF.substring(6, 8)].join('-'))
        if (wallet.balanceDate < ofxBalanceDate) {
            wallet.balance = balance.BALAMT;
            wallet.balanceDate = ofxBalanceDate;
        }
        transactions.forEach(async t => {
            const transaction: ITransaction = {
                type: t.TRNTYPE,
                date: new Date([t.DTPOSTED.substring(0, 4), t.DTPOSTED.substring(4, 6), t.DTPOSTED.substring(6, 8)].join('-')),
                amount: t.TRNAMT,
                transactionId: t.FITID,
                description: t.MEMO
            }
            const walletTransactions = wallet.transactions.filter(t => t.transactionId == transaction.transactionId);
            if (walletTransactions.length === 0) {
                wallet.transactions.push(transaction);
            }
        });

        await wallet.save();
    });

    res.status(200).send("Import success");
});

export default router;

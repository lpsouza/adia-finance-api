import { ITransaction } from "./ITransaction";

export interface IEntry {
    /**
     * OFX Field: BALAMT
     */
    balance: number,
    /**
     * OFX field: DTASOF
     */
    balanceDate: Date,
    walletId: string
}

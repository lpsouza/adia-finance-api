import { ITransaction } from "./ITransaction"

export interface IWallet {
    name: string,
    /**
     * Values: "creditcard", "bank", "savings"
     */
    type: string,
    user: string,
    /**
     * OFX Field: BALAMT
     */
    balance: number,
    /**
     * OFX field: DTASOF
     */
    balanceDate: Date,
    bankId: number,
    transactions?: ITransaction[],
    enabled: boolean
}

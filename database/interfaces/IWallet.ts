import { IEntry } from "./IEntry"

export interface IWallet {
    /**
     * Values: "creditcard", "bank", "savings"
     */
    type: string,
    user: string,
    bankId: number,
    bankName: string,
    enabled: boolean
}

import { IEntry } from "./IEntry"

export interface IWallet {
    name: string,
    /**
     * Values: "creditcard", "bank", "savings"
     */
    type: string,
    user: string,
    bankId: number,
    enabled: boolean
}

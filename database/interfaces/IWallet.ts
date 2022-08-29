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
    dateBalance: Date,
    bank?: string,
    enabled: boolean
}

export interface ITransaction {
    /**
     * OFX field: TRNTYPE
     */
    type: string,
    /**
     * OFX field: DTPOSTED
     */
    date: Date,
    /**
     * OFX field: TRNAMT
     */
    amount: number,
    /**
     * OFX field: FITID
     */
    transactionId: string,
    /**
     * OFX field: MEMO
     */
    description: string,
    customDescription?: string
    tags?: string[]
}

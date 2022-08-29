import { Schema } from "mongoose";
import { ITransaction } from "../interfaces/ITransaction";

export const TransactionSchema = new Schema<ITransaction>({
    type: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: false },
    transactionId: { type: String, required: false },
    description: { type: String, required: true },
    walletId: { type: String, required: true }
});
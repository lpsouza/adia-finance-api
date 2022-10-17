import { Schema } from "mongoose";
import { ITransaction } from "../interfaces/ITransaction";

export const TransactionSchema = new Schema<ITransaction>({
    type: { type: String, required: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    walletId: { type: String, required: true },
    description: { type: String, required: true },
    customDescription: { type: String, required: false },
    tags: { type: [String], required: false }
}, { timestamps: true });

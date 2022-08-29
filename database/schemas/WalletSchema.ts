import { Schema } from "mongoose";
import { IWallet } from "../interfaces/IWallet";
import { TransactionSchema } from "./TransactionSchema";

export const WalletSchema = new Schema<IWallet>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    user: { type: String, required: true },
    balance: { type: Number, required: true },
    balanceDate: { type: Date, required: true },
    bankId: { type: Number, required: true },
    transactions: { type: [TransactionSchema], required: false },
    enabled: { type: Boolean, required: true }
});

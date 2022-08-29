import { Schema } from "mongoose";
import { IWallet } from "../interfaces/IWallet";

export const WalletSchema = new Schema<IWallet>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    user: { type: String, required: true },
    balance: { type: Number, required: false },
    dateBalance: { type: Date, required: false },
    bank: { type: String, required: true },
    enabled: { type: Boolean, required: true }
});

import { Schema } from "mongoose";
import { IWallet } from "../interfaces/IWallet";

export const WalletSchema = new Schema<IWallet>({
    name: { type: String, required: true },
    type: { type: String, required: true },
    user: { type: String, required: true },
    bankId: { type: Number, required: true },
    enabled: { type: Boolean, required: true }
}, { timestamps: true });

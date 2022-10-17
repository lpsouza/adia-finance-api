import { Schema } from "mongoose";
import { IEntry } from "../interfaces/IEntry";

export const EntrySchema = new Schema<IEntry>({
    balance: { type: Number, required: true },
    balanceDate: { type: Date, required: true },
    walletId: { type: String, required: true }
}, { timestamps: true });

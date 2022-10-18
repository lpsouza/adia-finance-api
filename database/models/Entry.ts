import { model } from "mongoose";
import { IEntry } from "../interfaces/IEntry";
import { EntrySchema } from "../schemas/EntrySchema";

/**
 * Entry
 * @typedef {object} Entry
 * @property {string} _id
 * @property {number} balance.required
 * @property {string} balanceDate.required
 * @property {string} walletId.required
 */
export const Entry = model<IEntry>("entries", EntrySchema);

import { model } from "mongoose";
import { IEntry } from "../interfaces/IEntry";
import { EntrySchema } from "../schemas/EntrySchema";

/**
 * Entry
 * @typedef {object} Entry
 * @property {string} _id
 * @property {string} name.required
 * @property {string} type.required
 * @property {string} user.required
 * @property {number} balance.required
 * @property {string} balanceDate.required
 * @property {number} bankId.required
 * @property {array<Transaction>} transactions
 * @property {boolean} enabled.required
 */
export const Entry = model<IEntry>("entries", EntrySchema);

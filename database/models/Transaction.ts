import { model } from "mongoose";
import { ITransaction } from "../interfaces/ITransaction";
import { TransactionSchema } from "../schemas/TransactionSchema";

/**
 * Transaction
 * @typedef {object} Transaction
 * @property {string} _id
 * @property {string} type.required
 * @property {string} date.required
 * @property {number} amount.required
 * @property {string} transactionId.required
 * @property {string} walletId.required
 * @property {string} description.required
 * @property {string} customDescription
 * @property {array<string>} tags
 */
export const Transaction = model<ITransaction>("transactions", TransactionSchema);

import { model } from "mongoose";
import { IWallet } from "../interfaces/IWallet";
import { WalletSchema } from "../schemas/WalletSchema";

/**
 * Wallet
 * @typedef {object} Wallet
 * @property {string} _id
 * @property {string} name.required
 * @property {string} type.required
 * @property {string} user.required
 * @property {number} bankId.required
 * @property {boolean} enabled.required
 */
export const Wallet = model<IWallet>("wallets", WalletSchema);

import { model } from "mongoose";
import { IWallet } from "../interfaces/IWallet";
import { WalletSchema } from "../schemas/WalletSchema";

export const Wallet = model<IWallet>("wallets", WalletSchema);

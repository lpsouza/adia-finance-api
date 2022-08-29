import { model } from "mongoose";
import { ITransaction } from "../interfaces/ITransaction";
import { TransactionSchema } from "../schemas/TransactionSchema";

export const Transaction = model<ITransaction>("transactions", TransactionSchema);

import { connect, disconnect } from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

export class DB {
    private static instance: DB;
    private mongod: MongoMemoryServer;
    public inMemory: boolean;

    public static getInstance(): DB {
        if (!DB.instance) {
            DB.instance = new DB();
        }
        return DB.instance;
    }

    public async start() {
        if (process.env.CONNECTION_STRING) {
            connect(process.env.CONNECTION_STRING);
            this.inMemory = false;
        } else {
            this.mongod = await MongoMemoryServer.create();
            await connect(this.mongod.getUri());
            this.inMemory = true;
        }
    }

    public async stop() {
        await disconnect();
        if (this.mongod) {
            await this.mongod.stop({ force: true });
        }
    }
}

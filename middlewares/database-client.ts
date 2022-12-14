import { MongoClient } from 'mongodb';
import { Middleware } from '../types';

let MONGO_CLIENT: MongoClient;
export const databaseClientMiddleware: Middleware = async (req) => {
    if (!MONGO_CLIENT) {
        const { appContext: { config: { dbConnectionString } } } = req;
        MONGO_CLIENT = new MongoClient(dbConnectionString);
        await MONGO_CLIENT.connect();
    }
    const { appContext: { config: { database } } } = req;
    req.appContext.db = MONGO_CLIENT.db(database);
};
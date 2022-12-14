import type { Db } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface IAppConfig {
    database: string;
    dbConnectionString: string;
}

export interface IAppContext {
    db: Db;
    config: IAppConfig;
}

export interface INextApiRequest extends NextApiRequest {
    appContext: IAppContext;
}

export type Middleware = (req: INextApiRequest, res: NextApiResponse) => Promise<void>;
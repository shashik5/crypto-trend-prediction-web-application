import { IAppConfig, Middleware } from '../types';

const APP_CONFIG: IAppConfig = {
    database: process.env.DATABASE_NAME ?? '',
    dbConnectionString: process.env.DB_CONNECTION_STRING ?? ''
};

export const appConfigMiddleware: Middleware = async (req) => {
    req.appContext.config = APP_CONFIG;
};
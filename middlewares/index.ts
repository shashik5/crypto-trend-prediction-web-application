import { NextApiResponse } from 'next';
import { IAppContext, INextApiRequest, Middleware } from '../types';
import { appConfigMiddleware } from './app-config';
import { databaseClientMiddleware } from './database-client';

const MIDDLEWARES: Middleware[] = [
    appConfigMiddleware,
    databaseClientMiddleware
].filter(Boolean);

// This function can be marked `async` if using `await` inside
export function withMiddlewares<TResponseData = any>(handler: (req: INextApiRequest, res: NextApiResponse<TResponseData>) => Promise<void>) {
    return async (req: INextApiRequest, res: NextApiResponse<TResponseData>) => {
        req.appContext = {} as IAppContext;
        await Promise.all(MIDDLEWARES.map(async (middleware) => {
            return await middleware(req, res);
        }, []));
        return handler(req, res);
    };
}

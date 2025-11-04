import express, { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../errors/not-found.error';

export const pageNotFoundMiddleware = (app: express.Express) => {
    app.use((req: Request, res: Response, next: NextFunction) => {
        throw new NotFoundError('Page not found');
    }) ;
}
import express, { NextFunction, Request, Response } from 'express';
import { InternalServerError } from '../errors/internal-server.error';
import { ErrorBase } from '../errors/base.error';
import { errors, isCelebrateError } from 'celebrate';
import { ValidationError } from '../errors/validation.error';

export const errorHandler = (app: express.Express) => {

    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        if (isCelebrateError(error)) {
            const bodyError = error.details.get("body");
            const queryError = error.details.get("query");
            const paramsError = error.details.get("params");

            let message = bodyError?.details[0].message ||
                queryError?.details[0].message ||
                paramsError?.details[0].message;

            message = message?.replace(/"/g, "");
            new ValidationError(message!).send(res);
        } else if (error instanceof ErrorBase) {
            error.send(res);
        } else {
            new InternalServerError().send(res);
        }
    });
}
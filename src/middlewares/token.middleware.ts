import express, { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export const tokenMiddleware = (async (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        try {
            await new AuthService().login(authHeader);
            return next();
        } catch (error) {
            res.status(401).send();
        }
    }

    res.status(401).send();
});
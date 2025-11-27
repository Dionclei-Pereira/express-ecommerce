import { NextFunction, Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).send();
            } else {
                await new AuthService().login(authHeader);
                res.status(200).send({
                    valid: true
                });
            }
        } catch (err) {
            res.status(401).send();
        }
    }
}

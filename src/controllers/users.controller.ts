import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

export class UsersController {

    static async findAll(req: Request, res: Response, next: NextFunction) {
        res.send(await new UserService().findAll());
    }

    static async findById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        
        res.send(await new UserService().findById(userId));
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        const user: User = req.body;
        await new UserService().save(user);
        res.send('User created successfully');
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        let user: User = req.body;
        await new UserService().update(userId, user);
        res.send('User updated successfully');
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;

        await new UserService().delete(userId);

        res.status(204).end();
    }
}
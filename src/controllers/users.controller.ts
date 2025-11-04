import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/user.interface';
import { getFirestore } from 'firebase-admin/firestore';

export class UsersController {

    static async findAll(req: Request, res: Response, next: NextFunction) {
        try {
            const snapshot = await getFirestore().collection('users').get();
            const users = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                };
            });
            res.send(users);
        } catch (error) {
            next(error);
        }
    }

    static async findById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;

            const doc = await getFirestore().collection('users').doc(userId).get();
            let user = {
                id: userId,
                ...doc.data()
            };

            res.send(user);
        } catch (error) {
            next(error);
        }
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        try {
            const user: User = req.body;
            await getFirestore().collection('users').add(user);
            res.send('User created successfully');
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;
            let user: User = req.body;

            await getFirestore().collection('users').doc(userId).set({
                name: user.name,
                email: user.email
            });
            res.send('User updated successfully');
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id;

            await getFirestore().collection('users').doc(userId).delete();

            res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}
import { NextFunction, Request, Response } from 'express';
import { User } from '../models/user.model';
import { getFirestore } from 'firebase-admin/firestore';
import { NotFoundError } from '../errors/not-found.error';

export class UsersController {

    static async findAll(req: Request, res: Response, next: NextFunction) {
        const snapshot = await getFirestore().collection('users').get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
        res.send(users);
    }

    static async findById(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;

        const doc = await getFirestore().collection('users').doc(userId).get();
        if (doc.exists) {
            let user = {
                id: userId,
                ...doc.data()
            };

            res.send(user);
        } else {
            throw new NotFoundError("User not found");
        }
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        const user: User = req.body;
        await getFirestore().collection('users').add(user);
        res.send('User created successfully');
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;
        let user: User = req.body;

        const docRef = await getFirestore().collection('users').doc(userId);

        if ((await docRef.get()).exists) {
            docRef.set({
                name: user.name,
                email: user.email
            });
            res.send('User updated successfully');
        } else {
            throw new NotFoundError('User not found')
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id;

        await getFirestore().collection('users').doc(userId).delete();

        res.status(204).end();
    }
}
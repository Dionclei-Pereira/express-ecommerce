import { Request, Response } from 'express';
import { User } from '../interfaces/user.interface';
import { getFirestore } from 'firebase-admin/firestore';

let users: User[] = [];


export class UsersController {

    static async findAll(req: Request, res: Response) {
        const snapshot = await getFirestore().collection('users').get();
        const users = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
        res.send(users);
    }

    static async findById(req: Request, res: Response) {
        const userId = req.params.id;

        const doc = await getFirestore().collection('users').doc(userId).get();
        let user = {
            id: userId,
            ...doc.data()
        };
        
        res.send(user);
    }

    static async save(req: Request, res: Response) {
        const user: User = req.body;
        await getFirestore().collection('users').add(user);
        res.send('User created successfully');
    }

    static update(req: Request, res: Response) {
        const userId = req.params.id;
        let user: User = req.body;
    
        const indexOf = users.findIndex(u => u.id == userId);
        user.id = userId;
        users[indexOf] = user;
        res.send('User updated successfully');
    }

    static delete(req: Request, res: Response) {
    const userId = req.params.id;
    const indexOf = users.findIndex(u => u.id == userId);

    users.splice(indexOf, 1);
    res.send('User deleted succesfully');
    }
}
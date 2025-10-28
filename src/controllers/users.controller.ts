import { Request, Response } from 'express';
import { User } from '../interfaces/user.interface';

let id = 1;
let users: User[] = [{
    name: 'John',
    email: 'john@gmail.com',
    id: 0
}];


export class UsersController {

    static findAll(req: Request, res: Response) {
        res.send(users);
    }

    static findById(req: Request, res: Response) {
        const userId = Number(req.params.id);
        let user = users.find(user => user.id === userId);
        res.send(user);
    }

    static save(req: Request, res: Response) {
        const user: User = req.body;
        user.id = id++;
        users.push(user);
        res.send('User created successfully');
    }

    static update(req: Request, res: Response) {
        const userId = Number(req.params.id);
        let user: User = req.body;
    
        const indexOf = users.findIndex(u => u.id == userId);
        user.id = userId;
        users[indexOf] = user;
        res.send('User updated successfully');
    }

    static delete(req: Request, res: Response) {
    const userId = Number(req.params.id);
    const indexOf = users.findIndex(u => u.id == userId);

    users.splice(indexOf, 1);
    res.send('User deleted succesfully');
    }
}
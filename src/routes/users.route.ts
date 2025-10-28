import express, {Request, Response} from 'express';
import { User } from '../interfaces/user.interface';

export const userRoutes = express.Router();

let id = 1;
let users: User[] = [{
    name: 'John',
    email: 'john@gmail.com',
    id: 0
}];

userRoutes.get('/users', (req: Request, res: Response) => {
    res.send(users);
});

userRoutes.get('/users/:id', (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    let user = users.find(user => user.id === userId);
    res.send(user);
})

userRoutes.post('/users', (req: Request, res: Response) => {
    const user: User = req.body;
    user.id = id++;
    users.push(user);
    res.send('User created successfully');
});

userRoutes.put('/users/:id', (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    let user: User = req.body;

    const indexOf = users.findIndex(u => u.id == userId);
    user.id = userId;
    users[indexOf] = user;
    res.send('User updated successfully');
});

userRoutes.delete('/users/:id', (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    const indexOf = users.findIndex(u => u.id == userId);

    users.splice(indexOf, 1);
    res.send('User deleted succesfully');
});
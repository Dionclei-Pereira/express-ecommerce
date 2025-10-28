import express, {Request, Response} from 'express';
import { User } from './interfaces/user.interface';

const app = express();

// Using express default json configuration
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});

let id = 1;
let users: User[] = [{
    name: 'John',
    email: 'john@gmail.com',
    id: 0
}];

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.get('/users', (req: Request, res: Response) => {
    res.send(users);
});

app.get('/users/:id', (req: Request, res: Response) => {
    const userId = Number(req.params.id);
    let user = users.find(user => user.id === userId);
    res.send(user);
})

app.post('/users', (req: Request, res: Response) => {
    const user: User = req.body;
    user.id = id++;
    users.push(user);
    res.send('User created successfully');
});
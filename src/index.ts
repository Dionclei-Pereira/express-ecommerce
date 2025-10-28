import express, {Request, Response} from 'express';

const app = express();

// Using express default json configuration
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000')
});

let users = [{
    name: 'John',
    age: 12
}];

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!');
});

app.get('/users', (req: Request, res: Response) => {
    res.send(users);
});

app.post('/users', (req: Request, res: Response) => {
    const user = req.body;
    users.push(user);
    res.send('User created successfully');
});
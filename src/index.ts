import express, {Request, Response} from 'express';
import { routes } from './routes/router.index';
import { initializeApp } from 'firebase-admin/app';

const app = express();
initializeApp();

routes(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
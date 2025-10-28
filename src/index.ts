import express, {Request, Response} from 'express';
import { routes } from './routes/router.index';

const app = express();

routes(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
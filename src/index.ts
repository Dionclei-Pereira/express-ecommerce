import express from 'express';
import { routes } from './routes/router.index';
import { initializeApp } from 'firebase-admin/app';
import { errorHandler } from './middlewares/error.handler.middleware';

const app = express();
initializeApp();

routes(app);
errorHandler(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
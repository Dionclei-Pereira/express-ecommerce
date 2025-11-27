import express from 'express';
import { routes } from './routes/router.index';
import { errorHandler } from './middlewares/error-handler.middleware';
import { pageNotFoundMiddleware } from './middlewares/page-not-found.middleware';
import cors from 'cors';
import { initializeApp } from 'firebase-admin/app';

const app = express();
app.use(cors());
initializeApp();

routes(app);
pageNotFoundMiddleware(app);
errorHandler(app);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


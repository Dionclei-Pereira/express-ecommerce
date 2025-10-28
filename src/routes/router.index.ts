import express from 'express';
import { userRoutes } from './users.route';

export const routes = (app: express.Express ) => {
    // Using express default json configuration
    app.use(express.json());
    app.use(userRoutes);
}
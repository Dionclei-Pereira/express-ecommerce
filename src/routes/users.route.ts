import express from 'express';
import { UsersController } from '../controllers/users.controller';
import asyncHandler from 'express-async-handler';

export const userRoutes = express.Router();

userRoutes.get('/users', asyncHandler(UsersController.findAll));
userRoutes.get('/users/:id', asyncHandler(UsersController.findById));
userRoutes.post('/users', asyncHandler(UsersController.save));
userRoutes.put('/users/:id', asyncHandler(UsersController.update));
userRoutes.delete('/users/:id', asyncHandler(UsersController.delete));
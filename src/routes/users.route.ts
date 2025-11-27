import express from 'express';
import { UsersController } from '../controllers/users.controller';
import asyncHandler from 'express-async-handler';
import { celebrate, Segments } from 'celebrate';
import { userSchema } from '../models/user.model';
import { tokenMiddleware } from '../middlewares/token.middleware';

export const userRoutes = express.Router();

userRoutes.get('/users', tokenMiddleware, asyncHandler(UsersController.findAll));
userRoutes.get('/users/:id', tokenMiddleware, asyncHandler(UsersController.findById));
userRoutes.put('/users/:id', tokenMiddleware, celebrate({ [Segments.BODY]: userSchema }) , asyncHandler(UsersController.update));
userRoutes.delete('/users/:id', tokenMiddleware, asyncHandler(UsersController.delete));
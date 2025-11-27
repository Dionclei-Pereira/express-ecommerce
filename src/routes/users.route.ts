import express from 'express';
import { UsersController } from '../controllers/users.controller';
import asyncHandler from 'express-async-handler';
import { celebrate, Joi, Segments } from 'celebrate';
import { userSchema } from '../models/user.model';

export const userRoutes = express.Router();

userRoutes.get('/users', asyncHandler(UsersController.findAll));
userRoutes.get('/users/:id', asyncHandler(UsersController.findById));
userRoutes.put('/users/:id', celebrate({ [Segments.BODY]: userSchema} ) , asyncHandler(UsersController.update));
userRoutes.delete('/users/:id', asyncHandler(UsersController.delete));
import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import asyncHandler from 'express-async-handler';

export const authRoutes = express.Router();

authRoutes.post('/auth/login', asyncHandler(AuthController.login));
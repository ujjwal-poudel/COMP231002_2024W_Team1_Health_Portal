import { Router } from 'express';
import User from '../models/user.mjs';
import jwt from 'jsonwebtoken';
import { handleErrors, createToken } from '../utils/utils.mjs';
import dotenv from 'dotenv';
dotenv.config();
const router = Router();




  export const authRoutes = router;
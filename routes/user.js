import { getUser, signUp } from "../controllers/user.js";
import { Router } from "express";


export const userRouter = Router();

userRouter.post('/users/signup', signUp);

userRouter.get('/users/:id', getUser)
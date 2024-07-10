import { signUp } from "../controllers/user.js";
import { Router } from "express";

export const userRouter = Router()

userRouter.post('/user/signup', signUp)
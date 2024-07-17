import { createUserExperience, deleteUserExperience, getAllUserExperience, getExperience, updateUserExperience } from "../controllers/experience.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const experienceRouter = Router()

experienceRouter.post('/users/experiences', checkUserSession, createUserExperience)

experienceRouter.get('/users/experiences', checkUserSession, getAllUserExperience)

experienceRouter.get('/users/experiences/:id', checkUserSession, getExperience)

experienceRouter.patch('/users/experiences/:id', checkUserSession, updateUserExperience)

experienceRouter.delete('/users/experiences/:id', checkUserSession, deleteUserExperience)
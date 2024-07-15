import { createUserExperience, deleteUserExperience, getAllUserExperience, updateUserExperience } from "../controllers/experience.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const experienceRouter = Router()

experienceRouter.post('/users/experiences', checkUserSession, createUserExperience)

experienceRouter.get('/users/experiences', checkUserSession, getAllUserExperience)

experienceRouter.patch('/users/experiences/:id', checkUserSession, updateUserExperience)

experienceRouter.delete('/users/experiences/:id', checkUserSession, deleteUserExperience)
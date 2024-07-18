import { createUserExperience, deleteUserExperience, getAllUserExperience, getExperience, updateUserExperience } from "../controllers/experience.js";
import { checkAuth} from "../middlewares/auth.js";

import { Router } from "express";


export const experienceRouter = Router()

experienceRouter.post('/users/experiences', checkAuth, createUserExperience)

experienceRouter.get('/users/experiences', checkAuth, getAllUserExperience)

experienceRouter.get('/users/experiences/:id', checkAuth, getExperience)

experienceRouter.patch('/users/experiences/:id', checkAuth, updateUserExperience)

experienceRouter.delete('/users/experiences/:id', checkAuth, deleteUserExperience)
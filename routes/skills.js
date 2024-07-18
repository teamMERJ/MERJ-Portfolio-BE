
import { createUserSkill, deleteUserSkill, getAllUserSkills, getSkill, updateUserSkill } from "../controllers/skill.js";
import { checkAuth } from "../middlewares/auth.js";

import { Router } from "express";


export const skillRouter = Router()

skillRouter.post('/users/skills', checkAuth, createUserSkill)

skillRouter.get('/users/skills', checkAuth, getAllUserSkills)

skillRouter.get('/users/skills/:id', checkAuth, getSkill)

skillRouter.patch('/users/skills/:id', checkAuth, updateUserSkill)

skillRouter.delete('/users/skills/:id', checkAuth, deleteUserSkill)
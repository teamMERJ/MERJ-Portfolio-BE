
import { createUserSkill, deleteUserSkill, getAllUserSkills, getSkill, updateUserSkill } from "../controllers/skill.js";
import { checkUserSession } from "../middlewares/auth.js";

import { Router } from "express";


export const skillRouter = Router()

skillRouter.post('/users/skills', checkUserSession, createUserSkill)

skillRouter.get('/users/skills', checkUserSession, getAllUserSkills)

skillRouter.get('/users/skills/:id', checkUserSession, getSkill)

skillRouter.patch('/users/skills/:id', checkUserSession, updateUserSkill)

skillRouter.delete('/users/skills/:id', checkUserSession, deleteUserSkill)
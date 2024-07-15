import { Router } from "express";
import { deleteSkill, skills, getSkill, patchSkill, postSkills } from "../controllers/skill.js";



export const skillRouter = Router()

// defining routes for endpoints 
skillRouter.post('/skill',postSkills) 
skillRouter.get('/skill', skills)
skillRouter.get('/skill/:id', getSkill)
skillRouter.patch('/skill/:id', patchSkill)
skillRouter.delete('/skill/:id', deleteSkill)
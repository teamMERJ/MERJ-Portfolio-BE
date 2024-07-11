import { Router } from "express";
import { deleteExperience, experience, getExperience, patchExperience, postExperience } from "../controllers/experience.js";



export const experienceRouter = Router()

// defining routes for endpoints 
experienceRouter.post('/experience',postExperience) 
experienceRouter.get('/experience', experience)
experienceRouter.get('/experience/:id', getExperience)
experienceRouter.patch('/experience/:id', patchExperience)
experienceRouter.delete('/experience/:id', deleteExperience)
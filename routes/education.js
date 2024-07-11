import { Router } from "express";
import { deleteEducation, education, getEducation, patchEducation, postEducation } from "../controllers/education.js";



export const educationRouter = Router()

// defining routes for endpoints 
educationRouter.post('/education',postEducation) 
educationRouter.get('/education', education)
educationRouter.get('/education/:id', getEducation)
educationRouter.patch('/education/:id', patchEducation)
educationRouter.delete('/education/:id', deleteEducation)
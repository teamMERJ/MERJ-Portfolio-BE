import { Router } from "express";
import { deleteEducation, getAllUserEducation, getEducation, patchEducation, postEducation } from "../controllers/education.js";



export const educationRouter = Router()

// defining routes for endpoints 
educationRouter.post('/education',postEducation) 
educationRouter.get('/education', getAllUserEducation)
educationRouter.get('/education/:id', getEducation)
educationRouter.patch('/education/:id', patchEducation)
educationRouter.delete('/education/:id', deleteEducation)
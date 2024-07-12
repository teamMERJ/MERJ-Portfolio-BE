import { Router } from "express";
import { deleteProject, project, getProject, patchProject, postProject } from "../controllers/project.js";



export const projectRouter = Router()

// defining routes for endpoints 
projectRouter.post('/project',postProject) 
projectRouter.get('/project', project)
projectRouter.get('/project/:id', getProject)
projectRouter.patch('/project/:id', patchProject)
projectRouter.delete('/project/:id', deleteProject)
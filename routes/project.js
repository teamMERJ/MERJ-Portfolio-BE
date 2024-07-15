
import { createUserProject, deleteUserProject, getAllUserProjects, updateUserProject } from "../controllers/project.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";



export const projectRouter = Router()

projectRouter.post('/users/projects',  checkUserSession, createUserProject)

projectRouter.get('/users/projects', checkUserSession, getAllUserProjects)

projectRouter.patch('/users/projects/:id', checkUserSession, updateUserProject)

projectRouter.delete('/users/projects/:id',  checkUserSession, deleteUserProject)



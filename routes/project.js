
import { createUserProject, deleteUserProject, getAllUserProjects, getProject, updateUserProject } from "../controllers/project.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";
import { remoteUpload } from "../middlewares/uploads.js";



export const projectRouter = Router()

projectRouter.post('/users/projects',  checkUserSession,remoteUpload.single('image'), createUserProject)

projectRouter.get('/users/projects', checkUserSession, getAllUserProjects)

projectRouter.get('/users/projects/:id', checkUserSession, getProject)

projectRouter.patch('/users/projects/:id', checkUserSession,remoteUpload.single('image'), updateUserProject)

projectRouter.delete('/users/projects/:id',  checkUserSession, deleteUserProject)




import { createUserProject, deleteUserProject, getAllUserProjects, getProject, updateUserProject } from "../controllers/project.js";
import { checkAuth} from "../middlewares/auth.js";
import { Router } from "express";
import { remoteUpload } from "../middlewares/uploads.js";



export const projectRouter = Router()

projectRouter.post('/users/projects',  checkAuth,remoteUpload.single('image'), createUserProject)

projectRouter.get('/users/projects', checkAuth, getAllUserProjects)

projectRouter.get('/users/projects/:id', checkAuth, getProject)

projectRouter.patch('/users/projects/:id', checkAuth,remoteUpload.single('image'), updateUserProject)

projectRouter.delete('/users/projects/:id',  checkAuth, deleteUserProject)



import { Router } from "express";
import { addEducation, deleteUserEducation, getAllUserEducation,  getEducation,  updateUserEducation} from "../controllers/education.js"
import { checkAuth } from "../middlewares/auth.js";


export const educationRouter = Router()


// defining routes for endpoints 

educationRouter.post('/users/education', checkAuth, addEducation)

educationRouter.get('/users/education', checkAuth, getAllUserEducation)

educationRouter.get('/users/education/:id', checkAuth, getEducation)

educationRouter.patch('/users/education/:id', checkAuth, updateUserEducation)

educationRouter.delete('/users/education/:id', checkAuth, deleteUserEducation)


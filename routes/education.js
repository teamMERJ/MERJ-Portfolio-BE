import { Router } from "express";
import { addEducation, deleteUserEducation, getAllUserEducation,  updateUserEducation} from "../controllers/education.js"
import { checkUserSession } from "../middlewares/auth.js";


export const educationRouter = Router()


// defining routes for endpoints 

educationRouter.post('/users/education', checkUserSession, addEducation)

educationRouter.get('/users/education', getAllUserEducation)

educationRouter.patch('/users/education/:id', checkUserSession, updateUserEducation)

educationRouter.delete('/users/education/:id', checkUserSession, deleteUserEducation)


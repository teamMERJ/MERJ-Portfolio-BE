import { createUserVolunteering, deleteUserVolunteering, getAllUserVolunteering, updateUserVolunteering } from "../controllers/volunteering.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";



export const volunteeringRouter = Router()

volunteeringRouter.post('/users/volunteering', checkUserSession, createUserVolunteering)
volunteeringRouter.get('/users/volunteering', checkUserSession, getAllUserVolunteering)
volunteeringRouter.patch('/users/volunteering/:id', checkUserSession, updateUserVolunteering)
volunteeringRouter.delete('/users/volunteering/:id', checkUserSession, deleteUserVolunteering)
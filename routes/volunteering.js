import { createUserVolunteering, deleteUserVolunteering, getAllUserVolunteering, getVolunteering, updateUserVolunteering } from "../controllers/volunteering.js";
import { checkAuth } from "../middlewares/auth.js";
import { Router } from "express";



export const volunteeringRouter = Router()

volunteeringRouter.post('/users/volunteering', checkAuth, createUserVolunteering)

volunteeringRouter.get('/users/volunteering', checkAuth, getAllUserVolunteering)

volunteeringRouter.get('/users/volunteering/:id', checkAuth, getVolunteering)

volunteeringRouter.patch('/users/volunteering/:id', checkAuth, updateUserVolunteering)

volunteeringRouter.delete('/users/volunteering/:id', checkAuth, deleteUserVolunteering)
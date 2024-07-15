import { Router } from "express";
import { addVolunteering, deleteVolunteering, getAllVolunteering, getVolunteeringById, updateVolunteering } from "../controllers/volunteering.js";

export const volunteeringRouter = Router();

volunteeringRouter.post('/volunteering', addVolunteering);

volunteeringRouter.get('/volunteering/:volunteeringId', getVolunteeringById);

volunteeringRouter.get('/volunteering', getAllVolunteering);

volunteeringRouter.patch('/volunteering/:volunteeringId', updateVolunteering);

volunteeringRouter.delete('/volunteering/:volunteeringId', deleteVolunteering);
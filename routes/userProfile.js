import { Router } from "express";
import { deleteUserProfile, getAllProfile, getOneProfile, patchProfile, postUserProfile } from "../controllers/userProfile.js";

export const profileRouter = Router();

profileRouter.post('/profiles', postUserProfile);
profileRouter.get('/profiles', getAllProfile);
profileRouter.get('/profiles/:id', getOneProfile);
profileRouter.patch('/profiles/:id', patchProfile);
profileRouter.delete('/profiles/:id', deleteUserProfile);



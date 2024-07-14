import { Router } from "express";
import { deleteUserProfile, getAllProfile, getOneProfile, patchProfile, postUserProfile } from "../controllers/userProfile.js";
import { checkUserSession } from "../middlewares/auth.js";

export const profileRouter = Router();

profileRouter.post('/users/profiles', checkUserSession, postUserProfile);
profileRouter.get('//users/profiles', getAllProfile);
profileRouter.get('/users/profiles/:id', getOneProfile);
profileRouter.patch('/users/profiles/:id', patchProfile);
profileRouter.delete('/users/profiles /:id', deleteUserProfile);





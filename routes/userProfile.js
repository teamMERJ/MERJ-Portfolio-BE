import { Router } from "express";
import { deleteUserProfile, getAllProfile, getOneProfile, postUserProfile, updateProfile } from "../controllers/userProfile.js";
import { checkUserSession } from "../middlewares/auth.js";


export const profileRouter = Router();

profileRouter.post('/users/profiles', checkUserSession, postUserProfile);
profileRouter.get('//users/profiles', checkUserSession, getAllProfile);
profileRouter.get('/users/profiles/:id', checkUserSession, getOneProfile);
profileRouter.patch('/users/profiles/:id', checkUserSession, updateProfile);
profileRouter.delete('/users/profiles /:userProfileId', checkUserSession, deleteUserProfile);




import { Router } from "express";
import { createUserProfile, deleteUserProfile, getAllProfile, getOneProfile, updateUserProfile } from "../controllers/userProfile.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const profileRouter = Router();

profileRouter.post('/users/profiles', remoteUpload.fields([
     {name: 'profilePicture',maxCount: 1},
      {name: 'resume',maxCount: 1}]), checkUserSession, createUserProfile);
profileRouter.get('//users/profiles', checkUserSession, getAllProfile);
profileRouter.get('/users/profiles/:id',checkUserSession,  getOneProfile);
profileRouter.patch('/users/profiles/:id', checkUserSession, remoteUpload.fields([
    {name: 'profilePicture',maxCount: 1},
     {name: 'resume',maxCount: 1}]),updateUserProfile);
profileRouter.delete('/users/profiles /:id',checkUserSession,  deleteUserProfile);





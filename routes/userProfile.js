import { Router } from "express";
import {createUserProfile,deleteUserProfile,getUserProfile,updateUserProfile,} from "../controllers/userProfile.js";
import { checkAuth} from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const profileRouter = Router();



profileRouter.get("/users/userProfile", checkAuth, getUserProfile);

profileRouter.post("/users/userProfile",remoteUpload.fields([ { name: "profilePicture", maxCount: 1 },
     { name: "resume", maxCount: 1 }, ]),checkAuth,createUserProfile
);

profileRouter.patch("/users/userProfile/:id",checkAuth,remoteUpload.fields([
    { name: "profilePicture", maxCount: 1 },{ name: "resume", maxCount: 1 },]),updateUserProfile
);

profileRouter.delete( "/users/useProfile/:id", checkAuth, deleteUserProfile);



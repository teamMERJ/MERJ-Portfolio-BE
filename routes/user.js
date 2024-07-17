import { getUser, getUsers, login, signup, token, logout } from "../controllers/user.js";
import { Router } from "express";
import { createUserProfile, updateUserProfile } from "../controllers/userProfile.js";
import { checkUserSession } from "../middlewares/auth.js";
import { remoteUpload } from "../middlewares/uploads.js";

export const userRouter = Router();

userRouter.get("/users", getUsers);

userRouter.post("/users/auth/signup", signup);

userRouter.post("/users/auth/login", login);

userRouter.post("/users/auth/token/login", token);

userRouter.post("/users/auth/logout", logout);

userRouter.get("/users/auth/:userName", getUser);

userRouter.post("/users/userProfile", remoteUpload.fields([ { name: "profilePicture", maxCount: 1 },
   { name: "resume", maxCount: 1 },]),  checkUserSession,  createUserProfile);

userRouter.patch("/users/userProfile/:id", remoteUpload.fields([{ name: "profilePicture", maxCount: 1 },
  { name: "resume", maxCount: 1 },]),checkUserSession, updateUserProfile);


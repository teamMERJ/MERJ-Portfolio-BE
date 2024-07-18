import { createUserAchievement, deleteUserAchievement, getAllUserAchievements, getOneAchievement, updateUserAchievement } from "../controllers/achievement.js";
import { checkAuth } from "../middlewares/auth.js";
import { Router } from "express";
import { remoteUpload } from "../middlewares/uploads.js";


export const achievementRouter = Router()

achievementRouter.post('/users/achievements', checkAuth,remoteUpload.single('image'), createUserAchievement)

achievementRouter.get('/users/achievements', checkAuth, getAllUserAchievements)

achievementRouter.get ('/users/achievements/:id', checkAuth, getOneAchievement)

achievementRouter.patch('/users/achievements/:id', checkAuth,remoteUpload.single('image'), updateUserAchievement)

achievementRouter.delete('/users/achievements/:id', checkAuth, deleteUserAchievement)

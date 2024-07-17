import { createUserAchievement, deleteUserAchievement, getAllUserAchievements, getOneAchievement, updateUserAchievement } from "../controllers/achievement.js";
import { checkUserSession } from "../middlewares/auth.js";
import { Router } from "express";
import { remoteUpload } from "../middlewares/uploads.js";


export const achievementRouter = Router()

achievementRouter.post('/users/achievements', checkUserSession,remoteUpload.single('image'), createUserAchievement)

achievementRouter.get('/users/achievements', checkUserSession, getAllUserAchievements)

achievementRouter.get ('/users/achievements/:id', checkUserSession, getOneAchievement)

achievementRouter.patch('/users/achievements/:id', checkUserSession,remoteUpload.single('image'), updateUserAchievement)

achievementRouter.delete('/users/achievements/:id', checkUserSession, deleteUserAchievement)

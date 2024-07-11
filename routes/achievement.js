import { Router } from "express";
import { postAchievement, getAchievements, getAchievement, deleteAchievement, patchAchievement } from "../controllers/achievement.js";
import { remoteUpload } from "../middlewares/uploads.js";


export const achievementRouter = Router()

// defining routes for endpoints 
achievementRouter.post('/achievements',remoteUpload.single('image'),postAchievement) //,
achievementRouter.get('/achievements',getAchievements)
achievementRouter.get('/achievements/:id', getAchievement)
achievementRouter.patch('/achievements/:id', remoteUpload.single('image'),patchAchievement)
achievementRouter.delete('/achievements/:id',deleteAchievement)
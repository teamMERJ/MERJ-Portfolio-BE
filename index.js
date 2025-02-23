import express from "express";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import mongoose from "mongoose";
import { dbConnection } from "./config/db.js";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import { userRouter } from "./routes/user.js";
import { experienceRouter } from "./routes/experience.js";
import { educationRouter } from "./routes/education.js";
import { achievementRouter } from "./routes/achievement.js";
import { profileRouter } from "./routes/userProfile.js";
import { projectRouter } from "./routes/project.js";
import { skillRouter } from "./routes/skills.js";
import { volunteeringRouter } from "./routes/volunteering.js";
import { restartServer } from "./restart_server.js";

// creating the  app
const portfolioApp = express();

// applying middlewares
expressOasGenerator.handleResponses(portfolioApp, {
  alwaysServeDocs: true,
  tags: ["auth","userProfile","skills","projects","volunteering","experiences","education","achievements",],
  mongooseModels: mongoose.modelNames(),
});

const PORT = process.env.PORT || 3080;
portfolioApp.use(express.json());
portfolioApp.use(cors({ credentials: true, origin: "*" }));
portfolioApp.use(express.static("portfolio"));

portfolioApp.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    //   Store session
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

portfolioApp.get("/api/v1/health", (req, res) => {
  res.json({ status: "UP" });
});

// use routes

portfolioApp.use("/api/v1", educationRouter);
portfolioApp.use("/api/v1", experienceRouter);
portfolioApp.use("/api/v1", achievementRouter);
portfolioApp.use("/api/v1", projectRouter);
portfolioApp.use("/api/v1", skillRouter);
portfolioApp.use("/api/v1", profileRouter);
portfolioApp.use("/api/v1", volunteeringRouter);
portfolioApp.use("/api/v1", userRouter);

expressOasGenerator.handleRequests();
portfolioApp.use((req, res) => res.redirect("/api-docs/"));

// listening to the app for a response
const reboot = async () => {
  setInterval(restartServer, process.env.INTERVAL);
}

dbConnection()
.then(() =>{
    portfolioApp.listen(PORT, () =>{
        reboot().then(() =>{
            console.log(`Server restarted`);
        });
        console.log(`Server is connected to Port ${PORT}`);
    });
})
.catch((err) =>{
    console.log(err);
    process.exist(-1);
});

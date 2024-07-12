import express from "express";
import expressOasGenerator from "express-oas-generator";
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


// connect to the databse
dbConnection();

// creating the  app
const portfolioApp = express();
expressOasGenerator.handleResponses(portfolioApp, {
    alwaysServeDocs:true,
    tags : ['user','project'],
    mongooseModels:mongoose.modelNames()
});

// applying middlewares
portfolioApp.use(cors());
portfolioApp.use(express.json());
portfolioApp.use(express.static('portfolio'))
portfolioApp.use('/api/v1', userRouter)
portfolioApp.use('/api/v1', profileRouter)
portfolioApp.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
    //   Store session
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URL
    })
}));

// use routes
expressOasGenerator.handleRequests();
portfolioApp.use(experienceRouter)
portfolioApp.use(educationRouter)
portfolioApp.use(achievementRouter)



// listening to the app for a response

const port = process.env.PORT || 3080 
portfolioApp.listen (port, () =>{
    console.log(`Portfolio App running on ${port}`)
});

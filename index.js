import express from "express";
import expressOasGenerator from "@mickeymond/express-oas-generator";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import { checkUserSession } from "./middlewares/auth.js";
import MongoStore from "connect-mongo";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user.js";
import { experienceRouter } from "./routes/experience.js";
import {educationRouter} from "./routes/education.js"
import { achievementRouter } from "./routes/achievement.js";
import { profileRouter } from "./routes/userProfile.js";
import { volunteeringRouter } from "./routes/volunteering.js";
import { projectRouter } from "./routes/project.js";
import { skillRouter } from "./routes/skills.js";


// Connect to the database
dbConnection();

// Create the app
const portfolioApp = express();


// applying middlewares
expressOasGenerator.handleResponses(portfolioApp, {

  alwaysServeDocs: true,
  tags: ['user', 'project'],
  mongooseModels: mongoose.modelNames()
});

// Apply middlewares
portfolioApp.use(cors());
portfolioApp.use(express.json());
portfolioApp.use(express.static('portfolio'));

portfolioApp.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL
  })
}));

// Use the session middleware before any route that depends on it
portfolioApp.use(checkUserSession);

// Use routes
portfolioApp.use('/api/v1', userRouter);
portfolioApp.use('/api/v1', profileRouter);
portfolioApp.use('/api/v1', experienceRouter);
portfolioApp.use('/api/v1', educationRouter);
portfolioApp.use('/api/v1', achievementRouter);
portfolioApp.use('/api/v1', volunteeringRouter)
    alwaysServeDocs:true,
    tags: ['auth','userProfile', 'skills', 'projects', 'volunteering', 'experiences', 'education', 'achievements'], 
    mongooseModels:mongoose.modelNames()
});

portfolioApp.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  //   Store session
  store: MongoStore.create({
      mongoUrl:process.env.MONGO_URL
  })

 
}));

expressOasGenerator.handleRequests();
portfolioApp.use(cors());
portfolioApp.use(express.json());
portfolioApp.use(express.static('portfolio'))


// use routes
portfolioApp.use('/api/v1', userRouter)
portfolioApp.use('/api/v1', profileRouter)
portfolioApp.use('/api/v1', educationRouter)
portfolioApp.use('/api/v1', experienceRouter)
portfolioApp.use('/api/v1', achievementRouter)
portfolioApp.use('/api/v1',projectRouter)
portfolioApp.use("/api/v1", skillRouter);


// Handle OpenAPI requests and responses
expressOasGenerator.handleRequests();

// Listening to the app for a response
const port = process.env.PORT || 3080;
portfolioApp.listen(port, () => {
  console.log(`Portfolio App running on ${port}`);
});




// "firstName": "Jane", "lastName": "Smith", "email": "janesmith@example.com", "password": "pw1234", "confirmedPassword": "pw1234","userName": "JaneS"
//   "firstName": "Alice", "lastName": "Smith", "email": "alice.smith@example.com","password": "P@ssw0rd","confirmedPassword": "P@ssw0rd","userName": "AliceS"
//  "firstName": "Bob","lastName": "Johnson","email": "bob.johnson@example.com","password": "b0bP@ss","confirmedPassword": "b0bP@ss","userName": "BobJ"
// "firstName": "Emily","lastName": "Davis","email": "emily.davis@example.com","password": "3milyP@ss","confirmedPassword": "3milyP@ss","userName": "EmDavis"
//   "firstName": "Michael", "lastName": "Brown", "email": "michael.brown@example.com", "password": "Br0wnP@ss", "confirmedPassword": "Br0wnP@ss", "userName": "MikeB"
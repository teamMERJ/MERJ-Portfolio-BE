import express from "express";
import expressOasGenerator from "express-oas-generator";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import { checkUserSession } from "./middlewares/auth.js";
import MongoStore from "connect-mongo";
import { dbConnection } from "./config/db.js";
import { userRouter } from "./routes/user.js";
import { experienceRouter } from "./routes/experience.js";
import { educationRouter } from "./routes/education.js";
import { achievementRouter } from "./routes/achievement.js";
import { profileRouter } from "./routes/userProfile.js";
import { volunteeringRouter } from "./routes/volunteering.js";

// Connect to the database
dbConnection();

// Create the app
const portfolioApp = express();
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

// Handle OpenAPI requests and responses
expressOasGenerator.handleRequests();

// Listening to the app for a response
const port = process.env.PORT || 3080;
portfolioApp.listen(port, () => {
  console.log(`Portfolio App running on ${port}`);
});

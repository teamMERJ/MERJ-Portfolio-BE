import express from "express";
import expressOasGenerator from "express-oas-generator";
import mongoose from "mongoose";
import { dbConnection } from "./config/db.js";
import cors from "cors";
import { experienceRouter } from "./routes/experience.js";


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


// use routes
expressOasGenerator.handleRequests();
portfolioApp.use(experienceRouter)


// listening to the app for a response

const port = process.env.PORT || 3080 
portfolioApp.listen (port, () =>{
    console.log(`Portfolio App running on ${port}`)
});

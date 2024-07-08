import express from "express";
import mongoose from "mongoose";
import { dbConnection } from "./config/db.js";
import cors from "cors";

// connect to the databse
dbConnection();

// creating the express app
const portfolioApp = express();


// applying middlewares
portfolioApp.use(cors());
portfolioApp.use(express.json());
portfolioApp.use(express.static('portfolio'))




// listening to the app for a response

const port = process.env.PORT || 3080 
portfolioApp.listen (port, () =>{
    console.log(`Portfolio App running on ${port}`)
});

import mongoose from "mongoose";
import "dotenv/config"

const MongoUrl = process.env.MONGO_URL;

// connection link
export const dbConnection = () =>{
    mongoose.connect(MongoUrl).then(() => {
        console.log('Database connected')
    })
};
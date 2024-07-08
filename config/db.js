import mongoose from "mongoose";

const MongoUrl = process.env.MONGO_URL;

// connection link
export const dbConnection = () =>{
    mongoose.connect(MongoUrl).then(() => {
        console.log('Database connected')
    })
};
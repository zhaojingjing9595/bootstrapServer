import mongoose from "mongoose";

export const connectDB = async () => { 
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI);
        console.log(`mongoDB connected: ${conn.connection.host}`.cyan.bold)
    } catch (error) {
        console.error(`Error: ${error.message}`.red.bold);
        process.exit(1)
    }
}
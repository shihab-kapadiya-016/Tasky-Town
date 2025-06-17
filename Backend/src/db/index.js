import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_DATABASE_URI}/${DB_NAME}`)
        console.log("MongoDB connected at ", connectionInstance.connection.host)
    } catch (error) {
        console.error("Error connecting to the database", error)
        process.exit(1)
    }
}

export { connectDB }
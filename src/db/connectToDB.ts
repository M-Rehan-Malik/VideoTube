import mongoose from "mongoose";

export const connectToDB = async (DB_URI: string) => {
    try {
        await mongoose.connect(DB_URI)
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error connecting to DB", error)
    }
}
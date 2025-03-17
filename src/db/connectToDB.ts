import mongoose from "mongoose";

export const connectToDB = async (DB_URI: string) => {
        await mongoose.connect(DB_URI)
}
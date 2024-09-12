import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
            dbName: "node-auth-v1-db",
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
};
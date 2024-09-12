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

// let isConnected = false;

// export const connectDB = async () => {
//     if (isConnected) {
//         console.log('MongoDB is already connected');
//         return;
//     }
//     try {
//         await mongoose.connect(process.env.MONGO_URI as string, {
//             dbName: "node-auth-v1-db",
//         });
//         isConnected = true; 
//         console.log('MongoDB connected');
//     } catch (error) {
//         console.log(error);
//     }
// };




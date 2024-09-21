import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';
import User from '@/models/user'; // Your Mongoose User model

// Ensure this API route runs in the Node.js runtime
export const config = {
  runtime: 'nodejs',
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Connect to the database
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI as string);
    }

    // Fetch users
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed', error });
  }
}

export default handler;

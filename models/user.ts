import { Schema } from "mongoose";
import mongoose from "mongoose"

// Define your schema
const userSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
  email: {
    type: String,
    required: false,
    unique: true, // Ensure uniqueness
  },
  password: {
    type: String,
    required: false, // Not required for OAuth
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: String,
  resetPasswordExpiresAt: Date,
  verificationToken: String,
  verificationTokenExpiresAt: Date,
  role: {
    type: String,
    enum: ["User", "Admin", "Company"],
    default: "User",
  },
},   
{ timestamps: true }
);

// Check if the model exists in `models`, or create it if it doesn't
export default mongoose.models?.user || mongoose.model('user', userSchema)

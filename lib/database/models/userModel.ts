import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  image: { type: String },
  password: { type: String, select: false },
  googleId: { type: String },
  isVerfied: { type: Boolean, default: false },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String },
  email: { type: String, required: true },
  role: { type: String, default: "user" },
  phoneNumber: { type: String },
  image: { type: String },
  password: { type: String, select: false },
  googleId: { type: String },
  isVerfied: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "./database/models/userModel";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentTime(): string {
  const now = new Date();
  return now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

export async function getUserByEmail(email: string) {
  try {
    console.log("mencari ini", email);
    const user = await User.findOne({ email: email });
    console.log("ini user", user);
    return user;
  } catch {
    console.log("ga nemu");
    return null;
  }
}

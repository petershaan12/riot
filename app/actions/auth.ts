"use server";

import { signIn, signOut } from "@/lib/auth";
import { connectToDatabase } from "@/lib/database";
import { User } from "@/lib/database/models/userModel";
import { hash } from "bcryptjs";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

const credentialsLogin = async (email: string, password: string) => {    
  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error) {
        return error.cause.err.message; // return "custom error"
      }
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials";
        default:
          return "Something went wrong";
      }
    }
    throw error;
    // const someError = error as CredentialsSignin;
    // return someError.cause;
  }
};

const register = async (formData: FormData) => {
  const name = formData.get("name") as string | undefined;
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;

  if (!email || !password || !name) {
    throw new Error("Please provide all field");
  }

  await connectToDatabase();

  const user = await User.findOne({ email });

  if (user) throw new Error("User already Exists");

  const hashedPassword = await hash(password, 10);

  User.create({
    name,
    email,
    password: hashedPassword,
  });
};

const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

export { credentialsLogin, register, logout };

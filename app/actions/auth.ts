"use server";

import { signIn, signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { saltAndHashPassword } from "@/lib/utils";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

const login = async (email: string, password: string) => {
  const existingUser = await getUserByEmail(email as string);
  if (!existingUser) {
    return "User not found, Please register";
  }

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error: any) {
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
  }
};

const register = async (formData: FormData) => {
  const name = formData.get("name") as string | undefined;
  const email = formData.get("email") as string | undefined;
  const password = formData.get("password") as string | undefined;

  if (!email || !password || !name) {
    throw new Error("Please provide all field");
  }

  const user = await getUserByEmail(email);
  if (user) throw new Error("User already exists");

  const hashedPassword = await saltAndHashPassword(password);

  await db.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });
};

const logout = async () => {
  await signOut({ redirectTo: "/" });
  revalidatePath("/");
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};

export { login, register, logout, getUserByEmail, getUserById };

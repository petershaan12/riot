"use server";
import { signIn, signOut } from "@/lib/auth";
import { db } from "@/lib/db";
import { saltAndHashPassword } from "@/lib/utils";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { LoginSchema, RegisterSchema, UsernameSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import * as z from "zod";

const login = async (values: z.infer<typeof LoginSchema>) => {
  const email = values.email as string;
  const password = values.password;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "User not found, Please register" };
  }

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
      email,
      password,
    });
    return { success: "Login success" };
  } catch (error: any) {
    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error) {
        return { error: error.cause.err.message }; // return "custom error"
      }
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};

const register = async (values: z.infer<typeof RegisterSchema>) => {
  const username = await generateUsername(values.name as string);

  if (!values.email || !values.password || !values.name) {
    return { error: "Please provide all fields" };
  }

  const user = await getUserByEmail(values.email);
  if (user) {
    return { error: "User already exist" };
  }

  const hashedPassword = await saltAndHashPassword(values.password);

  await db.user.create({
    data: {
      ...values,
      password: hashedPassword,
      username,
    },
  });
  return { success: "Register success" };
};

const updateUsername = async (
  userId: string,
  values: z.infer<typeof UsernameSchema>
) => {
  const username = values.username as string;
  // console.log(userId, values);

  try {
    const existingUser = await db.user.findFirst({ where: { username } });

    if (existingUser) {
      return { error: "Username already exists" };
    }

    await db.user.update({
      where: { id: userId },
      data: { username },
    });

    return { success: "Username updated successfully" };
  } catch (error) {
    return { error: "Failed to update username" };
  }
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
    return null;
  }
};

const getUserByUsername = async (username: string) => {
  try {
    const user = await db.user.findFirst({ where: { username } });
    return user;
  } catch (e) {
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

const getAccountByUserId = async (id: string) => {
  try {
    const account = await db.account.findFirst({ where: { userId: id } });
    return account;
  } catch {
    return null;
  }
};

const generateUsername = async (name: string) => {
  const username = name.toLowerCase().replace(/\s/g, "-");
  const existingUser = await db.user.findFirst({ where: { username } });

  if (!existingUser) {
    return username;
  }

  return `${username}-${Math.floor(Math.random() * 1000)}`;
};

export {
  login,
  register,
  logout,
  getUserByEmail,
  getUserById,
  getAccountByUserId,
  generateUsername,
  updateUsername,
  getUserByUsername,
};

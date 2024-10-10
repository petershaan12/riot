"use server";
import { db } from "@/lib/db";
import { handleError, saltAndHashPassword } from "@/lib/utils";
import { organisasiFormSchema } from "@/schemas";
import { z } from "zod";
import { getUserByEmail, getUserById } from "./auth";
import path from "path";
import fs from "fs/promises";

const getAllPengurus = async () => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        role: "4",
      },
    });
    return users;
  } catch (error) {
    handleError(error);
  }
};

const createNewAccount = async (
  values: z.infer<typeof organisasiFormSchema>
) => {
  if (!values.email || !values.password || !values.name) {
    return { error: "Please provide all fields" };
  }

  const user = await getUserByEmail(values.email);
  if (user) {
    return { error: "Email already exist" };
  }

  // Check if the username contains spaces
  const username = values.username as string;
  if (/\s/.test(username)) {
    return { error: "Username should not contain spaces" };
  }
  const existingUser = await db.user.findFirst({ where: { username } });
  if (existingUser) {
    return { error: "Username already exists" };
  }

  const hashedPassword = await saltAndHashPassword(values.password);

  await db.user.create({
    data: {
      ...values,
      password: hashedPassword,
      role: "4",
      image: "/storage/images/default/riot.png",
    },
  });
  return { success: "Register success" };
};

export { getAllPengurus, createNewAccount };

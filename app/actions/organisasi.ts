"use server";
import { db } from "@/lib/db";
import { handleError, saltAndHashPassword } from "@/lib/utils";
import { organisasiEditFormSchema, organisasiFormSchema } from "@/schemas";
import { z } from "zod";
import { getUserByEmail, getUserById } from "./auth";
import path from "path";
import fs from "fs/promises";

const getAllOrganisasi = async () => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
      where: {
        role: "ORGANIZATION",
      },
    });
    return users;
  } catch (error) {
    handleError(error);
  }
};

const createNewOrganisasi = async (
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
      role: "ORGANIZATION",
      image: "/storage/images/default/riot.png",
    },
  });
  return { success: "Register success" };
};

const ubahOrganisasi = async (
  values: z.infer<typeof organisasiEditFormSchema>,
  userId: string
) => {
  const dbUser = (await getUserById(userId)) as any;

  if (!dbUser) return { error: "Unauthorized" };

  // Change Password
  if (values.password) {
    const hashedPassword = await saltAndHashPassword(values.password);
    values.password = hashedPassword;
  }

  //Change Image
  if (values.image && values.image !== dbUser.image) {
    try {
      // Extract the base64 part of the image string if it's encoded
      const base64Data = values.image.split(";base64,").pop();
      if (!base64Data) {
        return { error: "Invalid image" };
      }
      const imagePath = path.join(
        "public",
        "storage",
        "images",
        "profile",
        `${dbUser.id}.png`
      );
      await fs.writeFile(imagePath, base64Data, { encoding: "base64" });
      values.image = `/storage/images/profile/${dbUser.id}.png`;
    } catch (error) {
      return { error: "Failed to save image" };
    }
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Organisasi Profile Updated" };
};

export { getAllOrganisasi, createNewOrganisasi, ubahOrganisasi };

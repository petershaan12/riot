"use server";
import { currentUser, saltAndHashPassword } from "@/lib/utils";
import { SettingSchema } from "@/schemas";
import * as z from "zod";
import { getUserByEmail, getUserById } from "./auth";
import { db } from "@/lib/db";
import { compare } from "bcryptjs";
import { get } from "http";
import path from "path";
import fs from "fs/promises";

export const ubahProfile = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Unauthorized" };

  if (user.isOAtuh) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }

  // Change Password
  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await compare(values.password, dbUser.password);
    if (!passwordMatch) {
      return { error: "Incorrect Old Password" };
    }

    const hashedPassword = await saltAndHashPassword(values.newPassword);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  // Change Email
  const existingUser = await getUserByEmail(values.email as string);
  if (existingUser && existingUser.id !== dbUser.id) {
    return { error: "Email already in use" };
  }

  //Change Bio
  if (values.bio) {
    if (values.bio.length > 150) {
      return { error: "Bio cannot exceed 150 characters." };
    }
    values.bio = values.bio.substring(0, 150);
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
        "images",
        "profile",
        `${dbUser.id}.png`
      );
      await fs.writeFile(imagePath, base64Data, { encoding: "base64" });
      values.image = `/images/profile/${dbUser.id}.png`;
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

  return { success: "Profle Updated" };
};


export const getCategories = async () => {
  const categories = await db.category.findMany();
  return categories;
};

export const createCategory = async (name: string) => {
  const category = await db.category.create({
    data: {
      name,
    },
  });

  return category;
};
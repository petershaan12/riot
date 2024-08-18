"use server";
import { currentUser, handleError, saltAndHashPassword } from "@/lib/utils";
import { SettingSchema } from "@/schemas";
import * as z from "zod";
import { getUserByEmail, getUserById } from "./auth";
import { db } from "@/lib/db";
import { compare } from "bcryptjs";
import { get } from "http";
import path from "path";
import fs from "fs/promises";

const ubahProfile = async (values: z.infer<typeof SettingSchema>) => {
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

  return { success: "Profle Updated" };
};

const getCategories = async () => {
  const categories = await db.category.findMany();
  return categories;
};

const createCategories = async (name: string, points: number) => {
  const exisitingCategory = await getDuplicateCategories(name);
  if (exisitingCategory) {
    return { error: "Category already exist" };
  }

  if (name.length > 20) {
    return { error: "Category name cannot exceed 20 characters" };
  }

  const category = await db.category.create({
    data: {
      name,
      points,
    },
  });

  return { success: "Category added", id: category.id, name: category.name };
};

const getDuplicateCategories = async (name: string) => {
  try {
    const category = await db.category.findFirst({
      where: {
        name,
      },
    });

    return category;
  } catch (e) {
    handleError(e);
  }
};

const searchAll = async (search: string) => {
  console.log("search", search);
  const users = await db.user.findMany({
    where: {
      username: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  const events = await db.event.findMany({
    where: {
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
  });

  console.log(users, events);

  return { users, events };
};

export { ubahProfile, getCategories, createCategories, searchAll };
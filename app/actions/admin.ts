"use server";
import { SettingSchema } from "@/schemas";
import { z } from "zod";
import { getUserById } from "./auth";
import { db } from "@/lib/db";
import path from "path";
import { compare } from "bcryptjs";
import { currentUser, saltAndHashPassword } from "@/lib/utils";
import fs from "fs/promises";

const ubahProfileAdmin = async (
  values: z.infer<typeof SettingSchema>,
  userId: string
) => {
  const adminUser = await currentUser();

  if (!adminUser || adminUser.role !== "0") {
    return { error: "Unauthorized" };
  }

  // Get the user by ID (the user to be updated)
  const dbUser = (await getUserById(userId)) as any;

  if (!dbUser) {
    return { error: "User not found" };
  }

  // Change Password
  if (values.password) {
    const hashedPassword = await saltAndHashPassword(values.password);
    values.password = hashedPassword;
  }

  // Change Bio
  if (values.bio) {
    if (values.bio.length > 150) {
      return { error: "Bio cannot exceed 150 characters." };
    }
    values.bio = values.bio.substring(0, 150);
  }

  // Change Image
  if (values.image && values.image !== dbUser.image) {
    try {
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

  // Remove email from values to exclude it from the update
  const { email, ...updateValues } = values;

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...updateValues,
    },
  });

  return { success: "Profile Updated" };
};

const deleteUserAdmin = async (userId: string) => {
  const adminUser = await currentUser();

  if (!adminUser || adminUser.role !== "0") {
    return { error: "Unauthorized" };
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return { error: "User not found" };
  }

  await db.user.delete({
    where: {
      id: userId,
    },
  });

  return { success: "User deleted" };
};

export { ubahProfileAdmin, deleteUserAdmin };

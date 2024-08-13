"use server";
import { currentUser, saltAndHashPassword } from "@/lib/utils";
import { eventsFormSchema, SettingSchema } from "@/schemas";
import * as z from "zod";
import { getUserByEmail, getUserById } from "./auth";
import { db } from "@/lib/db";
import path from "path";
import fs from "fs/promises";
import { UserRole } from "@prisma/client";

const createEvent = async (values: z.infer<typeof eventsFormSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  console.log(user);

  if (user.role === UserRole.ADMIN) {
    return { error: "You are not Admin" };
  }

  if (values.imageUrl && values.imageUrl) {
    try {
      // Extract the base64 part of the image string if it's encoded
      const base64Data = values.imageUrl.split(";base64,").pop();
      if (!base64Data) {
        return { error: "Invalid image" };
      }
      const imagePath = path.join(
        "public",
        "images",
        "events",
        `${values.url}.png`
      );
      await fs.writeFile(imagePath, base64Data, { encoding: "base64" });
      values.imageUrl = `/images/events/${values.url}.png`;
    } catch (error) {
      return { error: "Failed to save image" };
    }
  }

  await db.events.create({
    data: {
      ...values,
      date: values.dateTime,
    },
  });
  return { success: "Create Event success" };
};

export { createEvent };

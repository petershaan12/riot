"use server";
import { currentUser } from "@/lib/utils";
import { eventsFormSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import path from "path";
import fs from "fs/promises";
import { UserRole } from "@prisma/client";

const createEvent = async (values: z.infer<typeof eventsFormSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  if (user.role !== UserRole.ADMIN) {
    return { error: "You are not Admin" };
  }
  const existingUrl = await getUrlEvent(values.url);
  if (existingUrl) {
    return { error: "Url already found, Please Change your url" };
  }

  if (values.imageUrl) {
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

  console.log("categoryId", values.categoryId);
  await db.events.create({
    data: {
      title: values.title,
      image: values.imageUrl,
      url: values.url,
      description: values.description,
      price: values.price,
      location: values.location,
      isFree: values.isFree,
      date: values.dateTime,
      categoryId: values.categoryId,
    },
  });
  return { success: "Create Event success" };
};

const getUrlEvent = async (url: string) => {
  try {
    const event = await db.events.findUnique({
      where: {
        url,
      },
    });
    return event;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export { createEvent };

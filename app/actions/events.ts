"use server";
import { eventsFormSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import path from "path";
import fs from "fs/promises";

const createEvent = async (values: z.infer<typeof eventsFormSchema>) => {
  if (!values.userId) {
    return { error: "Unauthorized" };
  }
  const existingUrl = await getUrlEvent(values.url);
  if (existingUrl) {
    return { error: "Url already found, Please Change your url" };
  }

  if (values.url == "create" || values.url == "edit") {
    return { error: "Url is invalid, Please change your url" };
  }

  if (!values.categoryId) {
    return { error: "Please Choose Category" };
  }

  if (!values.imageUrl) {
    return { error: "Please input image" };
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
        "storage",
        "images",
        "events",
        `${values.url}.png`
      );
      await fs.writeFile(imagePath, base64Data, { encoding: "base64" });
      values.imageUrl = `/storage/images/events/${values.url}.png`;
    } catch (error) {
      return { error: "Failed to save image" };
    }
  }

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
      userId: values.userId,
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

export { createEvent, getUrlEvent };

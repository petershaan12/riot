"use server";
import { EventAttendeeSchema, eventsFormSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import path from "path";
import fs from "fs/promises";
import { handleError } from "@/lib/utils";
import { compileAttendTemplate, sendMail } from "@/lib/mail";
import { generateTicketBarcode } from "./qrcode";

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
      console.log(error);
      return { error: "Failed to save image" };
    }
  }

  await db.event.create({
    data: {
      title: values.title,
      image: values.imageUrl,
      url: values.url,
      description: values.description,
      buildingName: values.buildingName,
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

const editEvent = async (values: z.infer<typeof eventsFormSchema>) => {
  if (!values.userId) {
    return { error: "Unauthorized" };
  }

  const existingEvent = await db.event.findUnique({
    where: { url: values.url },
  });

  if (!existingEvent) {
    return { error: "Event not found" };
  }

  if (existingEvent.userId !== values.userId) {
    return { error: "You are not authorized to edit this event" };
  }

  if (!values.categoryId) {
    return { error: "Please Choose Category" };
  }

  // Use the existing image if no new image is provided
  let imageUrl = existingEvent.image;
  console.log("imageUrl sekarang", imageUrl);

  // Check if there is a new image provided
  if (values.imageUrl !== existingEvent.image) {
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
      imageUrl = `/storage/images/events/${values.url}.png`; // Update image URL with new image
    } catch (error) {
      return { error: "Failed to save image" };
    }
  }

  console.log("imageUrl setelah", imageUrl);

  await db.event.update({
    where: { url: values.url },
    data: {
      title: values.title,
      image: imageUrl,
      buildingName: values.buildingName,
      description: values.description,
      price: values.price,
      location: values.location,
      isFree: values.isFree,
      date: values.dateTime,
      categoryId: values.categoryId,
    },
  });

  return { success: "Edit Event success" };
};

const attendEvent = async (
  event: any,
  user: any,
  values: z.infer<typeof EventAttendeeSchema>
) => {
  if (!user) {
    return { error: "Unauthorized" };
  }

  const existingEvent = await db.event.findUnique({
    where: { url: event.url },
  });

  if (!existingEvent) {
    return { error: "Event not found" };
  }

  const existingAttendee = await isUserAttendEvent(user.id, event.id);

  if (existingAttendee) {
    return { error: "You already attend this event" };
  }

  const ticket = await generateTicketBarcode(user.id, event.id);

  const attendance = await db.attendance.create({
    data: {
      eventId: event.id,
      userId: user.id,
      phone: values.phone,
      points: event.category.points,
      ticketId: ticket,
    },
  });

  if (user) {
    try {
      await sendMail({
        to: user.email,
        name: user.name,
        subject: "Invitation to attend event",
        body: compileAttendTemplate(user.name, event.title, event.url, ticket),
      });
    } catch (error) {
      return { error: "Event registered success but failed to send email" };
    }
  }

  return {
    success: "Event registered success, please check your email",
    ticketId: attendance.ticketId,
  };
};

const isUserAttendEvent = async (userId: string, eventId: string) => {
  try {
    if (!userId) return null;
    const attend = await db.attendance.findFirst({
      where: {
        userId,
        eventId,
      },
    });
    return attend;
  } catch (e) {
    handleError(e);
  }
};

const getManyUserAttendance = async (userId: string, events: any[]) => {
  try {
    if (!userId) return events.map((event) => ({ ...event, isAttend: false }));

    const eventsWithAttendance = await Promise.all(
      events.map(async (event) => {
        const isAttend = !!(await isUserAttendEvent(userId, event.id));
        return { ...event, isAttend };
      })
    );

    return eventsWithAttendance;
  } catch (e) {
    handleError(e);
  }
};

const getUrlEvent = async (url: string) => {
  try {
    const event = await db.event.findUnique({
      where: {
        url,
      },
      include: {
        category: {
          select: {
            name: true,
            points: true,
          },
        },
        user: {
          select: {
            image: true,
            username: true,
            name: true,
          },
        },
      },
    });
    return event;
  } catch (e) {
    handleError(e);
  }
};

//make app
const getAllEvents = async ({ filter = "", limit = 5, page = 1 }) => {
  try {
    const filterOptions = {} as any;

    // Terapkan filter berdasarkan nilai filter
    if (filter) {
      filterOptions.category = {
        name: filter,
      };
    }

    // Hitung offset berdasarkan halaman yang diminta
    const offset = (page - 1) * limit;

    const events = await db.event.findMany({
      where: filterOptions,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: {
          select: {
            name: true,
            points: true,
          },
        },
        user: {
          select: {
            id: true,
            image: true,
            username: true,
            name: true,
          },
        },
      },
      take: limit, // Batasi jumlah event yang diambil
      skip: offset, // Lewati event berdasarkan offset
    });
    const totalEvents = await db.event.count();
    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(totalEvents / limit),
    };
  } catch (e) {
    handleError(e);
  }
};

const getUserEvents = async (userId: string) => {
  try {
    const events = await db.event.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: {
          select: {
            name: true,
            points: true,
          },
        },
        user: {
          select: {
            image: true,
            username: true,
            name: true,
          },
        },
      },
    });
    return {
      data: JSON.parse(JSON.stringify(events)),
    };
  } catch (e) {
    handleError(e);
  }
};

const getParticipant = async (eventId: string) => {
  try {
    const attendees = await db.attendance.findMany({
      where: {
        eventId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            username: true,
            points: true,
          },
        },
        event: {
          select: {
            title: true,
          },
        },
      },
    });
    return attendees;
  } catch (e) {
    handleError(e);
  }
};

export {
  createEvent,
  editEvent,
  getUrlEvent,
  getAllEvents,
  getUserEvents,
  attendEvent,
  isUserAttendEvent,
  getManyUserAttendance,
  getParticipant,
};

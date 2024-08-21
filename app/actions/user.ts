"use server";

import { db } from "@/lib/db";
import { deleteAttentTemplate, sendMail } from "@/lib/mail";
import { handleError } from "@/lib/utils";

const getAllUser = async () => {
  try {
    const users = await db.user.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    return users;
  } catch (error) {
    handleError(error);
  }
};

const getAllParticipant = async () => {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        points: true,
      },
      where: {
        role: {
          notIn: ["ORGANIZATION", "ADMIN"],
        },
      },
      orderBy: {
        points: "desc",
      },
    });
    return users;
  } catch (error) {
    handleError(error);
  }
};

const getUserAttendEvent = async (userId: string) => {
  try {
    const events = await db.attendance.findMany({
      where: {
        userId,
      },
    });

    if (!events) {
      return { error: "Failed to retrieve events" };
    }
    const attend = events.length;

    return { attend };
  } catch (error) {
    handleError(error);
    return { error: "Failed to retrieve user attendance" };
  }
};

const getUserRank = async (userId: string) => {
  try {
    const users = await getAllParticipant();

    if (!users) {
      return { error: "Failed to retrieve users" };
    }

    const userIndex = users.findIndex((user) => user.id === userId);

    if (userIndex === -1) {
      return { error: "User not found" };
    }

    return { rank: userIndex + 1 };
  } catch (error) {
    handleError(error);
    return { error: "Failed to retrieve user rank" };
  }
};

const scanUserAttend = async (
  userId: string,
  points: number,
  eventId: string
) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (!points) {
      return { error: "Points for this event is missing" };
    }

    //check if status already present
    const attendance = await db.attendance.findFirst({
      where: {
        eventId,
        userId,
      },
    });

    if (!attendance) {
      return { error: "User not registered for this event" };
    }

    if (attendance?.status === "ATTENDED") {
      return { error: "User already attended this event" };
    }

    // Update attendace {
    await db.attendance.update({
      where: {
        id: attendance.id,
      },
      data: {
        status: "ATTENDED",
      },
    });
    // Update the user's points
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        points: user.points + points,
      },
    });

    return { success: "User attend " };
  } catch (error) {
    handleError(error);
    return { error: "Failed to attend user" };
  }
};

const editUserAttend = async (
  userId: string,
  points: number,
  attendanceId: string
) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

    if (!points) {
      return { error: "Points for this event is missing" };
    }

    //check if status already present
    const attendance = await db.attendance.findUnique({
      where: {
        id: attendanceId,
      },
    });

    if (!attendance) {
      return { error: "Attendance not found" };
    }

    if (attendance.status === "ATTENDED") {
      return { error: "User already attended this event" };
    }

    // Update attendace {
    await db.attendance.update({
      where: {
        id: attendanceId,
      },
      data: {
        status: "ATTENDED",
      },
    });

    // Update the user's points
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        points: user.points + points,
      },
    });

    return { success: "User attend" };
  } catch (error) {
    handleError(error);
    return { error: "Failed to attend user " };
  }
};

const deleteUserAttend = async (
  attendanceId: string,
  userId: string,
  title: string,
  ticketId: string
) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user?.email || !user?.name) {
      return { error: "User not found" };
    }

    await db.attendance.delete({
      where: {
        id: attendanceId,
      },
    });

    await db.ticket.delete({
      where: {
        id: ticketId,
      },
    });

    if (user) {
      try {
        await sendMail({
          to: user.email,
          name: user.name,
          subject: "Invitation to attend event",
          body: deleteAttentTemplate(user.name, title),
        });
      } catch (error) {
        return { error: "Delete Event success but failed to send email" };
      }
    }

    return { success: "User attendance deleted successfully" };
  } catch (error) {
    handleError(error);
    return { error: "Failed to delete user attendance" };
  }
};

export {
  getAllUser,
  getAllParticipant,
  getUserRank,
  editUserAttend,
  getUserAttendEvent,
  deleteUserAttend,
  scanUserAttend,
};

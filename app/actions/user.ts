"use server";

import { db } from "@/lib/db";
import { deleteAttentTemplate, sendMail } from "@/lib/mail";
import { handleError } from "@/lib/utils";

const getAllUser = async () => {
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
        points: "asc",
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
    const users = await getAllUser();

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

    if (attendance.status === "PRESENT") {
      return { error: "User already attended this event" };
    }

    // Update attendace {
    await db.attendance.update({
      where: {
        id: attendanceId,
      },
      data: {
        status: "PRESENT",
      },
    });

    // Update the user's points
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        points,
      },
    });

    return { success: "User points updated successfully" };
  } catch (error) {
    handleError(error);
    return { error: "Failed to update user points" };
  }
};

const deleteUserAttend = async (
  attendanceId: string,
  userId: string,
  title: string
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
  getUserRank,
  editUserAttend,
  getUserAttendEvent,
  deleteUserAttend,
};

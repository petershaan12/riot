"use server";

import { db } from "@/lib/db";
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

// Function to update user's points
const updatePointUser = async (userId: string, points: number) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return { error: "User not found" };
    }

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

export { getAllUser, getUserRank, updatePointUser, getUserAttendEvent };

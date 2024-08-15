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
      },
    });
    return users;
  } catch (error) {
    handleError(error);
  }
};

export { getAllUser };

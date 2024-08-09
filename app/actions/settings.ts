import { currentUser } from "@/lib/utils";
import { SettingSchema } from "@/schemas";
import * as z from "zod";
import { getUserById } from "./auth";
import { db } from "@/lib/db";

export const profile = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) return { error: "Unauthorized" };

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Profle Updated" };
};

"use server";
import { db } from "@/lib/db";

const getRankLimits = async () => {
  const rank = await db.rank.findMany();
  return rank;
};

const updateRankLimits = async (rank: any) => {
  console.log(rank);
  try {
    await db.rank.update({
      where: {
        id: rank.id,
      },
      data: {
        elite: rank.elite,
        ultra: rank.ultra,
        marathon: rank.marathon,
        half: rank.half,
        runner: rank.runner,
        jogger: rank.jogger,
        updatedAt: new Date(),
      },
    });
    return { success: "Rank limits updated" };
  } catch (error) {
    console.log(error);
    return { error: "Failed to update rank" };
  }
};

export { getRankLimits, updateRankLimits };

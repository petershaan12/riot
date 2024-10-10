"use client";
import UltraMarathoner from "@/public/assets/rank/UltraMarathoner.js";
import HalfMarathoner from "@/public/assets/rank/HalfMarathoner.js";
import Jogger from "@/public/assets/rank/Jogger.js";
import Marathoner from "@/public/assets/rank/Marathoner.js";
import Runner from "@/public/assets/rank/Runner.js";
import Elite from "@/public/assets/rank/Elite.js";
import { useEffect, useState } from "react";
import { getRankLimits } from "@/app/actions/rank";

type RankProps = {
  rank: number;
};

const Peringkat = ({ rank }: RankProps) => {
  const [limits, setLimits] = useState({
    id: "",
    elite: 80000,
    ultra: 80000,
    marathon: 80000,
    half: 80000,
    runner: 80000,
    jogger: 80000,
  });
  // Fetch rank limits when component mounts
  useEffect(() => {
    const fetchRankLimits = async () => {
      const rankLimits = await getRankLimits();
      setLimits(rankLimits[0] || {}); // Handle null or undefined limits
    };

    fetchRankLimits();
  }, []);

  if (rank > limits.elite) {
    return <Elite />;
  } else if (rank > limits.ultra) {
    return <UltraMarathoner />;
  } else if (rank > limits.marathon) {
    return <Marathoner />;
  } else if (rank > limits.half) {
    return <HalfMarathoner />;
  } else if (rank > limits.runner) {
    return <Runner />;
  } else if (rank > limits.jogger) {
    return <Jogger />;
  } else {
    return null;
  }
};

export default Peringkat;

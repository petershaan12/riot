"use client";

import { useEffect, useState, useTransition } from "react";
import { getRankLimits, updateRankLimits } from "@/app/actions/rank";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Assuming you have a Toast component for notifications
import { toast } from "sonner";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const RankLimitsUpdate = () => {
  const [limits, setLimits] = useState({
    id: "",
    elite: 0,
    ultra: 0,
    marathon: 0,
    half: 0,
    runner: 0,
    jogger: 0,
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  // Fetch rank limits when component mounts
  useEffect(() => {
    const fetchRankLimits = async () => {
      const rankLimits = await getRankLimits();
      setLimits(rankLimits[0] || {}); // Handle null or undefined limits
    };

    fetchRankLimits();
  }, []);

  console.log(limits);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setSuccess("");
    e.preventDefault();
    const toastId = toast.loading("Logging in");

    startTransition(() => {
      updateRankLimits(limits).then((data) => {
        if (data.error) {
          setError(data.error);
          toast.dismiss(toastId);
        }

        if (data.success) {
          toast.success(data.success, {
            id: toastId,
          });
        }
      });
    });
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4 ">
      <div className="flex items-center justify-between space-x-3">
        <Label htmlFor="elite">Elite</Label>
        <Input
          id="elite"
          type="number"
          value={limits.elite}
          onChange={(e) => setLimits({ ...limits, elite: +e.target.value })}
          className="mt-1 w-[200px]"
        />
      </div>
      <div className="flex items-center justify-between space-x-3">
        <Label htmlFor="ultra">Ultra Marathoner</Label>
        <Input
          id="ultra"
          type="number"
          value={limits.ultra}
          onChange={(e) => setLimits({ ...limits, ultra: +e.target.value })}
          className="mt-1 w-[200px]"
        />
      </div>
      <div className="flex items-center justify-between space-x-3">
        <Label htmlFor="marathon">Marathoner</Label>
        <Input
          id="marathon"
          type="number"
          value={limits.marathon}
          onChange={(e) => setLimits({ ...limits, marathon: +e.target.value })}
          className="mt-1 w-[200px]"
        />
      </div>
      <div className="flex items-center justify-between space-x-3">
        <Label htmlFor="half">Half Marathoner</Label>
        <Input
          id="half"
          type="number"
          value={limits.half}
          onChange={(e) => setLimits({ ...limits, half: +e.target.value })}
          className="mt-1 w-[200px]"
        />
      </div>
      <div className="flex items-center justify-between space-x-3">
        <Label htmlFor="runner">Runner</Label>
        <Input
          id="runner"
          type="number"
          value={limits.runner}
          onChange={(e) => setLimits({ ...limits, runner: +e.target.value })}
          className="mt-1 w-[200px]"
        />
      </div>
      <div className="flex items-center justify-between space-x-3">
        <Label htmlFor="jogger">Jogger</Label>
        <Input
          id="jogger"
          type="number"
          value={limits.jogger}
          onChange={(e) => setLimits({ ...limits, jogger: +e.target.value })}
          className="mt-1 w-[200px]"
        />
      </div>
      <FormError message={error} />
      <FormSuccess message={success} />
      <Button
        type="submit"
        disabled={isPending}
        className="w-full text-white font-monument-regular uppercase text-xl"
      >
        {isPending ? "Updating..." : "Update Rank"}
      </Button>
    </form>
  );
};

export default RankLimitsUpdate;

"use client";

import { editUserAttend } from "@/app/actions/user";
import { Check } from "lucide-react";
import { startTransition, useState } from "react";
import { toast } from "sonner";

type AttendButtonProps = {
  userId: string;
  attendanceId: string;
  userPoints: number;
  points: number;
  isAttend?: boolean;
};

const AttendButton = ({
  userId,
  attendanceId,
  userPoints,
  points,
}: AttendButtonProps) => {
  const handleAttend = async () => {
    const newPoints = userPoints + points;
    const toastId = toast.loading("Processing...");

    startTransition(() => {
      editUserAttend(userId, newPoints, attendanceId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error, { id: toastId });
            return;
          }
          if (data.success) {
            toast.success(data.success, {
              id: toastId,
            });
          }
        })
        .catch(() => {
          toast.error("Failed to attend the user");
        });
    });
  };

  return (
    <button
      className={`px-3 rounded-md py-2 mr-2 flex items-center space-x-2 bg-green-500`}
      onClick={() => handleAttend()}
    >
      <Check className="w-4 mr-1" /> Attend
    </button>
  );
};

export default AttendButton;

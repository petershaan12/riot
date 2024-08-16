"use client";

import { updatePointUser } from "@/app/actions/user";
import { Check } from "lucide-react";
import { startTransition, useState } from "react";
import { toast } from "sonner";

type AttendButtonProps = {
  userId: string;
  userPoints: number;
  points: number;
};

const AttendButton = ({ userId, userPoints, points }: AttendButtonProps) => {
  const [hasAttended, setHasAttended] = useState(false);

  const handleAttend = async () => {
    const newPoints = userPoints + points;
    const toastId = toast.loading("Processing...");

    startTransition(() => {
      updatePointUser(userId, newPoints)
        .then((data) => {
          if (data.error) {
            toast.error(data.error, { id: toastId });
            return;
          }
          if (data.success) {
            toast.success(data.success, {
              id: toastId,
            });
            setHasAttended(true);
          }
        })
        .catch(() => {
          toast.error("Failed to attend the user");
        });
    });
  };

  return (
    <button
      className={`px-3 rounded-md py-2 mr-2 flex items-center space-x-2 ${
        hasAttended ? "bg-gray-500 cursor-not-allowed" : "bg-green-500"
      }`}
      onClick={() => handleAttend()}
      disabled={hasAttended}
    >
      <Check className="w-4 mr-1" /> Attend
    </button>
  );
};

export default AttendButton;

"use client";

import { editUserAttend } from "@/app/actions/user";
import { Check } from "lucide-react";
import { startTransition, useState, useEffect } from "react";
import { toast } from "sonner";

type AttendButtonProps = {
  userId: string;
  attendanceId: string;
  points: number;
  isAttend: string;
};

const AttendButton = ({
  userId,
  attendanceId,
  points,
  isAttend: initialIsAttend,
}: AttendButtonProps) => {
  const [isAttend, setIsAttend] = useState(initialIsAttend);
  const [isButtonDisabled, setIsButtonDisabled] = useState(
    initialIsAttend === "GOING"
  );

  const handleAttend = async () => {
    const toastId = toast.loading("Processing...");

    startTransition(() => {
      editUserAttend(userId, points, attendanceId)
        .then((data) => {
          if (data.error) {
            toast.error(data.error, { id: toastId });
            return;
          }
          if (data.success) {
            toast.success(data.success, { id: toastId });
            // Update the isAttend state and disable the button after successful attendance
            setIsAttend("GOING");
            setIsButtonDisabled(true); // Disable the button immediately
          }
        })
        .catch(() => {
          toast.error("Failed to attend the user");
        });
    });
  };

  useEffect(() => {
    // Update the button state based on the new isAttend value
    setIsButtonDisabled(isAttend !== "GOING");
  }, [isAttend]);

  const buttonClass = isButtonDisabled
    ? "bg-white/40 cursor-not-allowed text-black"
    : "bg-green-500 hover:bg-green-700";
  const buttonText = isButtonDisabled ? "User already Attend" : "Attend";

  return (
    <button
      className={`px-3 rounded-md py-2 mr-2 text-xs flex items-center space-x-2 ${buttonClass}`}
      onClick={handleAttend}
      disabled={isButtonDisabled}
    >
      <Check className="w-4 mr-1" /> {buttonText}
    </button>
  );
};

export default AttendButton;

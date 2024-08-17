"use client";

import { deleteUserAttend } from "@/app/actions/user";
import { Check, Trash } from "lucide-react";
import { startTransition, useState } from "react";
import { toast } from "sonner";

type AttendButtonProps = {
  attendanceId: string;
  userId: string;
  title: string;
};

const DeleteButton = ({ attendanceId, userId, title }: AttendButtonProps) => {
  const [hasAttended, setHasAttended] = useState(false);

  const handleAttend = async () => {
    const toastId = toast.loading("Processing...");

    startTransition(() => {
      deleteUserAttend(attendanceId, userId, title)
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
        hasAttended ? "bg-gray-500 cursor-not-allowed" : "bg-red-500"
      }`}
      onClick={() => handleAttend()}
      disabled={hasAttended}
    >
      <Trash className="w-4 mr-1" /> Delete
    </button>
  );
};

export default DeleteButton;

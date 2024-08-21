"use client";

import { deleteUserAttend } from "@/app/actions/user";
import { Trash } from "lucide-react";
import { startTransition, useState } from "react";
import { toast } from "sonner";

type AttendButtonProps = {
  attendanceId: string;
  userId: string;
  title: string;
  ticketId: string;
};

const DeleteButton = ({
  attendanceId,
  userId,
  ticketId,
  title,
}: AttendButtonProps) => {
  const [hasAttended, setHasAttended] = useState(false);

  const handleAttend = async () => {
    const toastId = toast.loading("Processing...");

    startTransition(() => {
      deleteUserAttend(attendanceId, userId, title, ticketId)
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
          toast.error("Failed to delete the user");
        });
    });
  };

  return (
    <button
      className={`px-3 rounded-md py-2 mr-2 flex items-center space-x-2 text-xs ${
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

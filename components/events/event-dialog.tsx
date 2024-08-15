"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import EventSubmit from "./event-submit";
import { useState } from "react";
import { useRouter } from "next/navigation";

const EventDialog = ({ user, event }: any) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (open && !user) {
      router.push("/auth/login");
      return;
    }
    setIsDialogOpen(open);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger
        onClick={() => handleOpenChange(true)}
        className="w-full text-black bg-primary py-2 rounded-md font-monument-regular text-xl my-2 "
      >
        Register Now
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1a1c1d]/80 border-none shadow-none rounded-3xl ">
        <EventSubmit
          user={user}
          event={event}
          onClose={() => setIsDialogOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EventDialog;

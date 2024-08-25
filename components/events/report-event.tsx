"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IoWarning } from "react-icons/io5";

const ReportEvent = ({ user, event }: any) => {
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
      <DialogTrigger onClick={() => handleOpenChange(true)}>
        <p className="text-xs opacity-50 ">Report Event</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1a1c1d]/80 border-none shadow-none rounded-3xl ">
        <IoWarning className="w-8 h-8" />
        <h1 className="font-bold text-xl">Report Event</h1>
        <p className="text-sm font-light">
          Please Share more information about why you are reporting this event
        </p>
        <Textarea placeholder="Tell us here" />
        <Button className="bg-red-600 hover:bg-red-800 text-white hover:text-white text-lg">
          Submit Report
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ReportEvent;

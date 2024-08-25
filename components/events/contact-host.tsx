"use client";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ContactHost = ({ user, event }: any) => {
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
        <p className="text-xs opacity-50 ">Contact The Host</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#1a1c1d]/80 border-none shadow-none rounded-3xl ">
        <Mail className="w-8 h-8" />
        <h1 className="font-bold text-xl">Contact The Host</h1>
        <p className="text-sm font-light">
          Have a question about the event? <br />
          You can send a message to the host.
        </p>
        <Textarea placeholder="Tell us here" />
        <Button className="bg-white text-black text-lg">Send message</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ContactHost;

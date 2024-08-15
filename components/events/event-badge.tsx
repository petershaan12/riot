"use client";

import { toast } from "sonner";
import { Badge } from "../ui/badge";
import Link from "next/link";

type BadgeEventProps = {
  url: string;
};

const BadgeEvents = ({ url }: BadgeEventProps) => {
  const handleCopyLink = (url: string) => {
    const urlEdit = `${window.location.href}/${url}`;
    navigator.clipboard
      .writeText(urlEdit)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy link.");
      });
  };

  return (
    <div className="space-x-3">
      <Badge
        className="bg-white/20 cursor-pointer hover:text-black py-1 px-4 mt-5"
        onClick={() => handleCopyLink(url)}
      >
        Copy Link
      </Badge>
      <Badge className="bg-white/20 cursor-pointer hover:text-black py-1 px-4 mt-5">
        <Link href={`/events/${url}`}>Events Page</Link>
      </Badge>
    </div>
  );
};

export default BadgeEvents;

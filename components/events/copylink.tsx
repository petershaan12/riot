"use client";

import { toast } from "sonner";
import { Badge } from "../ui/badge";

const CopyLink = () => {
  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
    .catch((err) => {
        toast.error("Failed to copy link.");
      });
  };

  return (
    <>
      <Badge
        className=" bg-white/20 cursor-pointer hover:text-black py-1 px-2 md:mt-5"
        onClick={handleCopyLink}
      >
        Copy Link
      </Badge>
    </>
  );
};

export default CopyLink;

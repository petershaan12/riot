"use client";

import { toast } from "sonner";
import { Badge } from "../ui/badge";
import React from "react";

type CopyLinkProps = {
  name: string;
};

const CopyLink = (name: CopyLinkProps) => {
  const handleCopyLink = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const url = `${baseUrl}/events/${name.name}`;
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

"use client";

import { Badge } from "../ui/badge";
import Link from "next/link";
import CopyLink from "./copylink";

type BadgeEventProps = {
  url: string;
};

const BadgeEvents = ({ url }: BadgeEventProps) => {
  return (
    <div className="space-x-3">
      <CopyLink name={url} />
      <Badge className="bg-white/20 cursor-pointer hover:text-black py-1 px-4 mt-5">
        <Link href={`/events/${url}`}>Events Page</Link>
      </Badge>
    </div>
  );
};

export default BadgeEvents;

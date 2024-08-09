"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Calendar, Settings } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const user = useCurrentUser();
  const getDate = user?.createdAt;
  const dateObject = new Date(getDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = dateObject.toLocaleDateString("en-us", options);

  return (
    <>
      <section className=" p-5 md:py-10 max-w-5xl flex justify-center">
        <div className="flex items-center justify-center text-center gap-5">
          <Avatar className="cursor-pointer w-[200px] h-[200px]">
            <AvatarImage src={user?.image || ""} className="" />
            <AvatarFallback>PS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <h1 className="text-3xl uppercase font-bold">{user?.name}</h1>
            <p className="opacity-50">@petershaan_</p>
            <p className="flex items-center font-light  opacity-50 text-sm ">
              {" "}
              <Calendar className="w-4 mr-2 " strokeWidth={2} />
              Joined on {formattedDate}
            </p>
            <p>Selalu Semangat</p>
          </div>
        </div>
        <Link href="/profile/ubahProfile">
          <Settings className="w-4" />
        </Link>
      </section>
    </>
  );
};

export default Page;

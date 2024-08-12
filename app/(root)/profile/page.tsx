"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Calendar, Settings } from "lucide-react";
import Link from "next/link";
import Loading from "../loading";

const Page = () => {
  const { user, isLoading } = useCurrentUser();

  const getDate = user?.createdAt;
  const dateObject = new Date(getDate);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = dateObject.toLocaleDateString("en-us", options);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className=" p-5 md:py-10 max-w-5xl flex justify-center">
      <div className="md:flex items-center justify-center text-center gap-5">
        <Avatar className="cursor-pointer md:w-[200px] md:h-[200px]">
          <AvatarImage src={user?.image || ""} className="" />
          <AvatarFallback>
            <p className="text-4xl font-bold uppercase">
              {user?.name?.substring(0, 2)}
            </p>
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h1 className="text-3xl uppercase font-bold">{user?.name}</h1>
          <p className="opacity-50">@{user?.username ?? "-"}</p>
          <p className="flex items-center font-light  opacity-50 text-sm ">
            {" "}
            <Calendar className="w-4 mr-2 " strokeWidth={2} />
            Joined on {formattedDate}
          </p>
          {user?.bio && <p>{user.bio}</p>}
        </div>
      </div>
      <Link href="/profile/ubahProfile">
        <Settings className="w-4" />
      </Link>
    </section>
  );
};

export default Page;

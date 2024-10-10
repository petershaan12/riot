import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Calendar, Settings } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@/lib/utils";
import { getUserEvents } from "@/app/actions/events";
import ProfileEventCard from "@/components/profile/profile-event-card";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getUserAttendEvent, getUserRank } from "@/app/actions/user";
import React from "react";
import Peringkat from "@/components/rank/peringkat";

const Page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }
  if (user.username === null) {
    redirect("/auth/username");
  }

  const events = await getUserEvents(user.id);

  const rankResponse = await getUserRank(user.id);
  const getAttendEvent = await getUserAttendEvent(user.id);

  const getDate = user?.createdAt;
  const dateObject = new Date(getDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
  };
  const formattedDate = dateObject.toLocaleDateString("en-us", options);

  // console.log(user);

  return (
    <>
      <section className=" p-2 md:py-10  max-w-5xl flex justify-center ">
        <div className="md:flex items-center justify-center text-center  gap-5">
          <Avatar className="cursor-pointer w-28 h-28 md:w-[200px] md:h-[200px]">
            <AvatarImage src={user?.image || ""} className="" />
            <AvatarFallback>
              <p className="text-4xl font-bold uppercase">
                {user?.name?.substring(0, 2)}
              </p>
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col my-5 items-start">
            {user?.role === "1" || user?.role === "0" ? (
              <div className="flex space-x-3">
                <h1 className="text-3xl uppercase font-bold">{user?.name}</h1>
              </div>
            ) : (
              <h1 className="text-3xl uppercase font-bold">{user?.name}</h1>
            )}
            <p className="opacity-50">@{user?.username ?? "-"}</p>
            <div className="flex items-center gap-x-2 py-2">
              <Peringkat rank={user?.points} />
              <p className="flex items-center opacity-50 ">
                <Calendar className="w-5 mr-2 " strokeWidth={2.5} />
                Joined on {formattedDate}
              </p>
            </div>
            {user?.bio && <p>{user.bio}</p>}
            {user?.role === "4" && (
              <div className="flex space-x-5">
                <div className="flex">
                  <Image
                    src="/assets/icons/file.svg"
                    width={15}
                    height={15}
                    alt="Pin Image"
                  />

                  <p>
                    <span className="font-bold mr-1 ml-2">
                      {getAttendEvent.attend !== undefined
                        ? getAttendEvent.attend
                        : "N/A"}
                    </span>
                    <span className="opacity-50">Attend</span>
                  </p>
                </div>
                <div className="flex">
                  <Image
                    src="/assets/icons/diagram.svg"
                    width={15}
                    height={15}
                    alt="Pin Image"
                  />

                  <p>
                    <span className="font-bold mr-1 ml-2">
                      {rankResponse.rank !== undefined
                        ? rankResponse.rank
                        : "N/A"}
                    </span>
                    <span className="opacity-50">Rank</span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <Link href="/profile/ubahProfile">
          <Settings className="w-4 hover:text-primary" />
        </Link>
      </section>
      <section className="md:w-[700px] mb-12">
        <div>
          <Separator className="my-5" />
          {(user?.role === "1" || user?.role === "0") && (
            <>
              <div>
                <h2 className="uppercase font-bold text-3xl mb-5">Events</h2>
              </div>
              <ProfileEventCard data={events?.data} />
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;

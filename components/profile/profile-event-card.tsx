"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import NoEvent from "../events/no-event";
import EventImage from "../EventImage";

type User = {
  name: string | null;
  image: string | null;
  username: string | null;
};

interface Event extends Document {
  id: string;
  user: User;
  date: Date;
  url: string;
  title: string;
  image: string;
}

type ProfileEventCardProps = {
  data: Event[];
};

const ProfileEventCard = ({ data }: ProfileEventCardProps) => {
  return data.length > 0 ? (
    data?.map((event: any) => (
      <div key={event.id} className="cursor-pointer    mb-4 ">
        <Link href={`/events/${event.url}`}>
          <div key={event.id} className="flex items-center">
            <EventImage
              imageUrl={event.image}
              size={150}
              title={event.title}
              className="rounded-sm md:rounded-2xl mx-2 object-cover w-[100psx] h-[100px] md:w-[150px] md:h-[150px]"
            />
            <div className="items-start flex flex-col ml-5">
              <h1 className="md:text-xl font-semibold text-start leading-tight mt-2">
                {event.title}
              </h1>
              <div className="flex items-center space-x-2 mt-5">
                <Avatar className="cursor-pointer w-6 h-6">
                  <AvatarImage src={event.user.image || ""} />
                  <AvatarFallback>
                    <p className="font-bold uppercase">
                      {event.user.name.substring(0, 2)}
                    </p>
                  </AvatarFallback>
                </Avatar>
                <p className="font-light ">By {event.user.name || ""}</p>
              </div>
              <p className="font-light text-xs md:text-sm my-5">
                {formatDate(event.date)}
              </p>
            </div>
          </div>
        </Link>
      </div>
    ))
  ) : (
    <div className="-mt-5">
      <NoEvent title="No Event Made " />
    </div>
  );
};

export default ProfileEventCard;

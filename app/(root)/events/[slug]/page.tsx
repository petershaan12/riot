import { getUrlEvent, isUserAttendEvent } from "@/app/actions/events";
import CopyLink from "@/components/events/copylink";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentUser, formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import EventDialog from "@/components/events/event-dialog";
import MapDisplay from "@/components/GoogleMaps";
import EventImage from "@/components/EventImage";
import ContactHost from "@/components/events/contact-host";
import ReportEvent from "@/components/events/report-event";
import React from "react";

type SearchParamsProps = {
  params: { slug: string };
};

const Page = async ({ params: { slug } }: SearchParamsProps) => {
  const event = await getUrlEvent(slug);

  if (!event) {
    notFound();
  }

  const user = await currentUser();
  const isAttend = await isUserAttendEvent(user?.id, event?.id);

  return (
    <>
      <section className="p-5 md:pb-10 md:flex space-x-5 space-y-5">
        <div className="">
          <div className="md:w-[250px] w-[200px] mx-auto my-5 ">
            <AspectRatio ratio={1 / 1} className="flex-center">
              <EventImage
                imageUrl={event?.image}
                size={500}
                title={event?.title}
                className="rounded-2xl  "
              />
            </AspectRatio>
          </div>
          <div className="md:block items-center justify-center space-x-2 md:mb-0 mb-5 ">
            <CopyLink name={event?.url} />
            <Badge className="bg-[#352F20] text-[#ECCB56] cursor-pointer text-xs  hover:text-black py-1 px-2  md:mt-4">
              {event.category.name}
            </Badge>
            <div className="inline md:hidden space-x-2">
              <ContactHost user={user} event={event} />
              <ReportEvent user={user} event={event} />
            </div>
          </div>
          <div className="flex items-center my-5">
            <Avatar className="cursor-pointer">
              <AvatarImage src={event.user.image || ""} />
              <AvatarFallback>
                <p className="font-bold uppercase">
                  {event.user.name?.substring(0, 2)}
                </p>
              </AvatarFallback>
            </Avatar>
            <div className="p-3">
              <p className="text-xs">presented by</p>
              <Link
                href={`/${event.user.username}`}
                passHref
                className="font-bold hover:text-primary"
              >
                {event.user.name}
              </Link>
            </div>
          </div>
          <Separator className="bg-white/50 my-5" />
          <div className="md:flex md:flex-col items-start space-y-3 hidden">
            <ContactHost user={user} event={event} />
            <ReportEvent user={user} event={event} />
          </div>
        </div>

        <div className="md:w-[600px]">
          {!user && (
            <Badge className="bg-[#70FF00]/20 my-2  hover:text-black py-1 px-4 mt-5">
              Youre Invites to join ✨
            </Badge>
          )}
          <h1 className="text-2xl md:text-5xl uppercase font-bold">
            {event?.title}
          </h1>
          <div className="flex items-center space-x-2 mt-5">
            <div className="border border-white/50 rounded-lg w-12 flex-center px-3 py-2 ">
              <h1 className=" text-2xl font-bold  text-white">
                {formatDateTime(event.date).bigNumberDate}
              </h1>
            </div>
            <div className="leading-5">
              <p> {formatDateTime(event.date).formattedDate}</p>
              <p> {formatDateTime(event.date).formattedTime}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 py-5">
            <div className="border border-white/50 rounded-lg w-12 flex-center px-3 py-2 ">
              <Image
                src="/assets/icons/pin.svg"
                width={30}
                height={30}
                alt="Pin Image"
              />
            </div>
            <div className="leading-5">
              <p>{event.buildingName}</p>
            </div>
          </div>

          {event?.userId === user?.id ? (
            <div>
              <Link href={`/events/${event.url}/participant`}>
                <Button
                  type="submit"
                  className="w-full mb-2  border border-primary text-black font-bold text-xl "
                >
                  Participant Attendance
                </Button>
              </Link>
              <Link href={`/events/${event.url}/edit`}>
                <Button
                  type="submit"
                  className="w-full text-primary bg-transparent border border-primary hover:bg-transparent hover:text-primary  font-bold text-xl "
                >
                  Edit This Event
                </Button>
              </Link>
            </div>
          ) : !isAttend ? (
            <EventDialog user={user} event={event} />
          ) : (
            <div
              className="flex items-center p-4 mb-4 text-sm  rounded-lg  bg-gray-800/20  text-primary"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-bold">
                  You Already Register this Event
                </span>{" "}
                Check your email
              </div>
            </div>
          )}

          <div className="mt-10">
            <h4 className="py-2 font-medium">Description</h4>
            <Separator className="bg-white/20" />
            <p className="my-5">{event.description}</p>
          </div>
          <div className="mt-10 ">
            <h4 className="py-2 font-medium">Location Detail</h4>
            <Separator className="bg-white/20" />
            <p className="my-5">{event.location}</p>

            <MapDisplay address={event.location} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;

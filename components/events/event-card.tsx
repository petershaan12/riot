"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "@/app/actions/auth";
import { formatDate, formatDateTime } from "@/lib/utils";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import BadgeEvents from "./event-badge";
import { format } from "date-fns";
import { Separator } from "../ui/separator";
import EventDialog from "./event-dialog";
import NoEvent from "./no-event";
import MapDisplay from "../GoogleMaps";
import EventImage from "../EventImage";
import { Button } from "../ui/button";
import React from "react";

type Category = {
  name: string | null;
};

type User = {
  id: string | null;
  name: string | null;
  image: string | null;
  username: string | null;
};

type Event = {
  id: string;
  userId: string;
  user: User;
  date: Date;
  url: string;
  title: string;
  image: string;
  category: Category;
  isAttend: boolean;
  buildingName: string;
  location: string;
};

type EventCardProps = {
  data: Event[];
  emptyTitle: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  className?: string;
  user?: User;
};

const EventCard = ({
  data,
  emptyTitle,
  limit,
  user,
  page,
  totalPages = 0,
  className,
}: EventCardProps) => {
  console.log(user);

  const [sheetState, setSheetState] = useState<{
    isOpen: boolean;
    event: Event | null;
    user: User | null;
  }>({
    isOpen: false,
    event: null,
    user: null,
  });

  const handleCardClick = (event: Event) => {
    setSheetState({
      isOpen: true,
      event,
      user: user || null,
    });
  };

  return (
    <>
      <div>
        {data?.length > 0 ? (
          data?.map((event: any) => (
            <div
              key={event.id}
              className={`${className} cursor-pointer bg-[#393939]/20 backdrop-blur-xl md:py-5 md:px-8 px-3 py-3 rounded-md md:rounded-2xl md:w-[800px] mb-4 transform transition-transform duration-300 hover:scale-105  hover:shadow-sm hover:border hover:border-white/20 hover:shadow-primary/20`}
              onClick={() => handleCardClick(event)}
            >
              <div key={event.id} className="flex items-center justify-between">
                <div className="items-start flex flex-col">
                  <p className="font-light text-xs md:text-sm">
                    {formatDate(event.date)}
                  </p>
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
                    <div className="font-light text-xs flex space-x-3">
                      <p>By {event.user.username || ""} </p>
                      <Image
                        alt="centang_biru"
                        src="/assets/icons/centangbiru.svg"
                        width={15}
                        height={15}
                      />
                    </div>
                  </div>
                  <Badge className="bg-[#352F20] text-[#ECCB56] cursor-pointer text-xs md:text-xs hover:text-black py-1 px-2 md:px-4 mt-4">
                    {event.category.name}
                  </Badge>
                </div>
                <EventImage
                  imageUrl={event.image}
                  size={150}
                  title={event.title}
                  className="rounded-sm md:rounded-2xl mx-2 object-cover w-[100psx] h-[100px] md:w-[150px] md:h-[150px]"
                />
              </div>
            </div>
          ))
        ) : (
          <NoEvent title={emptyTitle} />
        )}
      </div>

      {Number(page) > 0 && (
        <div className="pt-8">
          {totalPages > 1 && (
            <Pagination className="flex items-end">
              <PaginationContent>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href={`?page=${index + 1}`}
                      isActive={index + 1 === Number(page)}
                      className="hover:bg-primary hover:border-none hover:text-black"
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href={`?page=${Number(page) + 1}`} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      )}

      {sheetState.event && (
        <Sheet
          open={sheetState.isOpen}
          onOpenChange={(isOpen) => setSheetState({ ...sheetState, isOpen })}
        >
          <SheetContent className="bg-[#131517] p-0 border-white/20 md:min-w-[500px] rounded-xl overflow-y-auto ">
            <div className="my-2 px-4">
              <BadgeEvents url={sheetState.event.url} />
            </div>
            <Separator className="bg-white/20" />
            <SheetHeader className="flex-center my-5">
              <EventImage
                imageUrl={sheetState.event.image}
                size={300}
                title={sheetState.event.title}
                className=" rounded-sm md:rounded-2xl mx-2 object-cover w-[100px] h-[100px] md:w-[300px] md:h-[300px] "
              />
            </SheetHeader>
            <SheetTitle className="md:text-4xl text-2xl px-5">
              {sheetState.event.title}
            </SheetTitle>
            <SheetDescription className="px-5 mt-2 ">
              <div className="flex items-center space-x-2 mb-5">
                <Avatar className="cursor-pointer w-8 h-8">
                  <AvatarImage src={sheetState.event.user.image || ""} />
                  <AvatarFallback>
                    <p className="font-bold uppercase">
                      {sheetState.event.user.name?.substring(0, 2) || ""}
                    </p>
                  </AvatarFallback>
                </Avatar>
                <Link
                  href={`/${sheetState.event.user.username}`}
                  className="hover:underline text-white hover:text-primary"
                >
                  <div className=" flex space-x-3">
                    <p>By {sheetState.event.user.username || ""} </p>
                    <Image
                      alt="centang_biru"
                      src="/assets/icons/centangbiru.svg"
                      width={15}
                      height={15}
                    />
                  </div>
                </Link>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <div className="border border-white/50 rounded-lg w-12 flex-center px-3 py-2 ">
                  <h1 className="text-xl md:text-2xl font-bold  text-white">
                    {formatDateTime(sheetState.event.date).bigNumberDate}
                  </h1>
                </div>
                <div className="leading-5">
                  <p> {formatDateTime(sheetState.event.date).formattedDate}</p>
                  <p> {formatDateTime(sheetState.event.date).formattedTime} </p>
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
                <div className="leading-5">{sheetState.event.buildingName}</div>
              </div>

              {sheetState.event.userId === sheetState.user?.id ? (
                <div>
                  <Link href={`/events/${sheetState.event.url}/participant`}>
                    <Button
                      type="submit"
                      className="w-full mb-2 border border-primary text-black font-bold text-xl"
                    >
                      Participant Attendance
                    </Button>
                  </Link>
                  <Link href={`/events/${sheetState.event.url}/edit`}>
                    <Button
                      type="submit"
                      className="w-full text-primary bg-transparent border border-primary hover:bg-transparent hover:text-primary font-bold text-xl mb-5"
                    >
                      Edit This Event
                    </Button>
                  </Link>
                </div>
              ) : !sheetState.event.isAttend ? (
                <EventDialog user={sheetState.user} event={sheetState.event} />
              ) : (
                <div
                  className="flex items-center p-4 mb-4 text-sm rounded-lg bg-gray-800/20 text-primary"
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
              <div className="my-5">
                <h1 className="font-medium text-base my-2 opacity-100 text-white">
                  Location
                </h1>
                <Separator className="bg-white/80 my-2" />
                <p className="text-white text-xl font-semibold my-1">
                  {sheetState.event.buildingName}
                </p>
                <p>{sheetState.event.location}</p>

                <MapDisplay address={sheetState.event.location} />
              </div>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default EventCard;

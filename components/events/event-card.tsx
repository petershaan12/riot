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

type Category = {
  name: string | null;
};

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
  category: Category;
}

type EventCardProps = {
  data: Event[];
  emptyTitle: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  className?: string;
};

const EventCard = ({
  data,
  emptyTitle,
  limit,
  page,
  totalPages = 0,
  className,
}: EventCardProps) => {
  const [sheetState, setSheetState] = useState<{
    isOpen: boolean;
    event: Event | null;
  }>({
    isOpen: false,
    event: null,
  });

  const handleCardClick = (event: Event) => {
    setSheetState({
      isOpen: true,
      event,
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
                    <p className="font-light text-xs">
                      By {event.user.name || ""}
                    </p>
                  </div>
                  <Badge className="bg-[#352F20] text-[#ECCB56] cursor-pointer text-xs md:text-xs hover:text-black py-1 px-2 md:px-4 mt-4">
                    {event.category.name}
                  </Badge>
                </div>
                <Image
                  src={event.image}
                  width={150}
                  height={150}
                  alt={`Gambar ${event.title}`}
                  className=" rounded-sm md:rounded-2xl mx-2 object-cover w-[100px] h-[100px] md:w-[150px] md:h-[150px] "
                />
              </div>
            </div>
          ))
        ) : (
          <p className="w-[800px] mt-5 flex-center flex-col">
            <Image
              src="/assets/images/no-event.png"
              objectFit="cover"
              width={280}
              height={280}
              quality={100}
              priority
              alt="No Events Found"
            />
            <p className="text-2xl font-medium">{emptyTitle}</p>
            <p className="mt-2 text-[#848484]">Check back Later</p>
          </p>
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
              <Image
                src={sheetState.event.image}
                width={300}
                height={300}
                alt={`Gambar ${sheetState.event.title}`}
                className=" rounded-sm md:rounded-2xl mx-2 object-cover w-[300px] h-[300px] md:w-[300px] md:h-[300px] "
              />
            </SheetHeader>
            <SheetTitle className="text-4xl px-5">
              {sheetState.event.title}
            </SheetTitle>
            <SheetDescription className="p-5">
              <div className="flex items-center space-x-2 mt-5">
                <Avatar className="cursor-pointer w-8 h-8">
                  <AvatarImage src={sheetState.event.user.image || ""} />
                  <AvatarFallback>
                    <p className="font-bold uppercase">
                      {sheetState.event.user.name?.substring(0, 2) || ""}
                    </p>
                  </AvatarFallback>
                </Avatar>
                <p className=" ">By {sheetState.event.user.name || ""}</p>
              </div>
              <div className="flex items-center space-x-2 mt-5">
                <div className="border border-white/50 rounded-lg w-12 flex-center px-3 py-2 ">
                  <h1 className=" text-2xl font-bold  text-white">
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
                <div className="leading-5">
                  <p>Mercure Bandung Nexa Supratman</p>
                  <p> Kota Bandung, Jawa Barat</p>
                </div>
              </div>
              <div className="leading-5">
                <p>Mercure Bandung Nexa Supratman</p>
                <p> Kota Bandung, Jawa Barat</p>
              </div>
              <div className="leading-5">
                <p>Mercure Bandung Nexa Supratman</p>
                <p> Kota Bandung, Jawa Barat</p>
              </div>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};

export default EventCard;

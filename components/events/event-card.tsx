"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getUserById } from "@/app/actions/auth";
import { formatDate } from "@/lib/utils";
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
};

const EventCard = ({
  data,
  emptyTitle,
  limit,
  page,
  totalPages = 0,
}: EventCardProps) => {
  return (
    <>
      <div>
        {data?.length > 0 ? (
          data?.map((event: any) => (
            <div
              key={event.id}
              className="cursor-pointer bg-[#393939]/20 backdrop-blur-xl md:py-5 md:px-8 px-3 py-3 rounded-md md:rounded-2xl md:w-[800px] mb-4 transform transition-transform duration-300 hover:scale-105  hover:shadow-sm hover:border hover:border-white/20 hover:shadow-primary/20"
            >
              <Link
                href={`/events/${event.url}`}
                key={event.id}
                className="flex items-center justify-between"
              >
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
              </Link>
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
    </>
  );
};

export default EventCard;

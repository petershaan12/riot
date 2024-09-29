import EventCard from "@/components/events/event-card";
import { Calendar } from "@/components/ui/calendar";
import { getAllEvents, getManyUserAttendance } from "@/app/actions/events";
import Category from "@/components/events/category";
import { currentUser } from "@/lib/utils";
import React from "react";
type SearchParamsProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const filter = (searchParams?.category as string) || "";
  const page = Number(searchParams?.page as string) || 1;
  const user = await currentUser();
  const events = await getAllEvents({ filter, limit: 5, page });

  const eventsWithAttendance =
    (await getManyUserAttendance(user?.id, events?.data)) ?? [];

  return (
    <>
      <section className="bg-contain p-5 md:py-10">
        <div className="flex flex-col items-center justify-center text-center md:gap-5">
          <div>
            <h1 className="text-2xl md:text-5xl uppercase font-bold">Events</h1>
            <p className="opacity-50">let's join us</p>
          </div>
          <div className="md:flex mt-5">
            <section id="eventCard" className="space-y-5 ">
              <EventCard
                data={eventsWithAttendance}
                emptyTitle="No Events Found"
                limit={5}
                page={page}
                user={user}
                totalPages={events?.totalPages}
                className="md:hover:-translate-x-12 "
              />
            </section>
            <section id="sideBar" className="md:ml-5">
              <div className="bg-[#393939]/20 rounded-2xl border border-white/20 backdrop-blur-xl  hidden md:block">
                <Calendar mode="single" className="rounded-md" />
              </div>
              <Category />
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;

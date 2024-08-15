import { getUrlEvent, getUserAttendEvent } from "@/app/actions/events";
import CopyLink from "@/components/events/copylink";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { currentUser, formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import EventDialog from "@/components/events/event-dialog";

type SearchParamsProps = {
  params: { slug: string };
};

const Page = async ({ params: { slug } }: SearchParamsProps) => {
  const event = await getUrlEvent(slug);

  if (!event) {
    redirect("/404");
  }

  const user = await currentUser();
  const isAttend = await getUserAttendEvent(user?.id, event?.id);

 

  return (
    <>
      <section className="p-5 md:py-10 flex space-x-5 ">
        <div className="">
          <div className="w-[250px]  ">
            <AspectRatio ratio={1 / 1} className="flex-center">
              <Image
                src={event?.image}
                width={500}
                height={500}
                alt="Gambar Events"
                className="rounded-2xl "
              />
            </AspectRatio>
          </div>
          <CopyLink />
          <div className="flex items-center">
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
              <p className="font-bold">{event.user.name}</p>
            </div>
          </div>
          <Separator className="bg-white/50 my-5" />
          <p className="text-xs opacity-50">Contact The Host</p>
          <p className="text-xs opacity-50 mt-4">Report Events</p>
        </div>

        <div className="w-[600px]">
          {!user && (
            <Badge className="bg-[#70FF00]/20 my-2  hover:text-black py-1 px-4 mt-5">
              Youre Invites to join ✨
            </Badge>
          )}
          <h1 className="text-5xl uppercase font-bold">{event?.title}</h1>
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
              <p>Mercure Bandung Nexa Supratman</p>
              <p> Kota Bandung, Jawa Barat</p>
            </div>
          </div>
          {!isAttend ? (
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

          {event?.userId === user?.id && (
            <Link href={`/events/${event.url}/edit`} className="mt-5">
              <Button
                type="submit"
                className="w-full text-primary bg-transparent border border-primary  font-monument-regular text-xl "
              >
                Edit This Event
              </Button>
            </Link>
          )}

          <div className="mt-10">
            <h4 className="py-2">Location Detail</h4>
            <Separator className="bg-white" />
            <p className="my-5">
              Mercure Bandung Nexa Supratman Jl. Supratman No.66 - 68, Cihaur
              Geulis, Kec. Cibeunying Kaler, Kota Bandung, Jawa Barat 40122,
              Indonesia
            </p>

            <p className="opacity-50">Google Maps</p>
          </div>
          
        </div>
      </section>
    </>
  );
};

export default Page;

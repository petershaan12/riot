import { getUserById } from "@/app/actions/auth";
import { getUrlEvent } from "@/app/actions/events";
import CopyLink from "@/components/events/copylink";
import TidakDitemukan from "@/components/shared/TidakDitemukan";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import Image from "next/image";

type SearchParamsProps = {
  params: { slug: string };
};

const Page = async ({ params: { slug } }: SearchParamsProps) => {
  const event = await getUrlEvent(slug);

  if (!event) {
    return <TidakDitemukan />;
  }
  const userEvent = await getUserById(event?.userId as string);
  const dateTime = event?.date;
  const date = new Date(dateTime);

  const formattedDate = format(date, "EEEE, MMMM d");
  const formattedTime = format(date, "h:mm a");
  const bigNumberDate = format(date, "d");

  console.log(event);
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
              <AvatarImage src={userEvent?.image || ""} />
              <AvatarFallback>
                <p className="font-bold uppercase">
                  {userEvent?.name?.substring(0, 2)}
                </p>
              </AvatarFallback>
            </Avatar>
            <div className="p-3">
              <p className="text-xs">presented by</p>
              <p className="font-bold">{userEvent?.name}</p>
            </div>
          </div>
          <Separator className="bg-white/50 my-5" />
          <p className="text-xs opacity-50">Contact The Host</p>
          <p className="text-xs opacity-50 mt-4">Report Events</p>
        </div>
        <div className="w-[600px]">
          <Badge className="bg-[#70FF00]/20 my-2  hover:text-black py-1 px-4 mt-5">
            Youre Invites to join ✨
          </Badge>
          <h1 className="text-5xl uppercase font-bold">{event?.title}</h1>
          <div className="flex items-center space-x-2 mt-5">
            <div className="border border-white/50 rounded-lg w-12 flex-center px-3 py-2 ">
              <h1 className=" text-2xl font-bold  text-white">
                {bigNumberDate}
              </h1>
            </div>
            <div className="leading-5">
              <p>{formattedDate}</p>
              <p>{formattedTime} </p>
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
          <Button
            type="submit"
            className="w-full text-black font-monument-regular text-xl "
          >
            Register Now
          </Button>

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

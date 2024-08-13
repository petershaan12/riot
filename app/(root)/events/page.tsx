"use client";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { eventsFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

type EventsFormProps = {
  userId: string;
  type: "create" | "edit";
};

const Page = ({ userId, type }: EventsFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof eventsFormSchema>>({
    resolver: zodResolver(eventsFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (values: z.infer<typeof eventsFormSchema>) => {
    setError("");
    setSuccess("");
  };

  return (
    <>
      <section className="bg-contain p-5 md:py-10">
        <div className="flex flex-col items-center justify-center text-center gap-5">
          <div>
            <h1 className="text-5xl uppercase font-bold">Events</h1>
            <p className="opacity-50">let's join us</p>
          </div>
          <div className="flex">
            <section id="eventCard" className="space-y-5">
              <div className="flex items-center justify-between  bg-[#1C1E20] py-5 px-8 rounded-2xl w-[800px]">
                <div className="items-start flex flex-col">
                  <p className="font-light">Today, 06:00 AM Apr 6 2024</p>
                  <h1 className="text-2xl font-semibold">
                    Lari Bersama RIOT Indonesia
                  </h1>
                  <div className="flex items-center space-x-2  mt-5">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={""} className="" />
                      <AvatarFallback>
                        <p className="font-bold uppercase">RE</p>
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-light">By RIOT Bandung</p>
                  </div>
                  <Badge className="bg-[#352F20]  text-[#ECCB56] cursor-pointer  hover:text-black py-1 px-4 mt-2">
                    Capsitas 100 Orang
                  </Badge>
                </div>
                <Image
                  src="/storage/images/events/halo.png"
                  width={200}
                  height={200}
                  alt="Gambar Events"
                  className="rounded-2xl"
                />
              </div>
              <div className="flex items-center justify-between  bg-[#1C1E20] py-5 px-8 rounded-2xl w-[800px] ">
                <div className="items-start flex flex-col">
                  <p className="font-light">Today, 06:00 AM Apr 6 2024</p>
                  <h1 className="text-2xl font-semibold">
                    Lari Bersama RIOT Indonesia
                  </h1>
                  <div className="flex items-center space-x-2  mt-5">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src={""} className="" />
                      <AvatarFallback>
                        <p className="font-bold uppercase">RE</p>
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-light">By RIOT Bandung</p>
                  </div>
                  <Badge className="bg-[#352F20]  text-[#ECCB56] cursor-pointer  hover:text-black py-1 px-4 mt-2">
                    Capsitas 100 Orang
                  </Badge>
                </div>
                <Image
                  src="/storage/images/events/halo.png"
                  width={200}
                  height={200}
                  alt="Gambar Events"
                  className="rounded-2xl"
                />
              </div>
            </section>
            <section id="sideBar">
              <Calendar mode="single" className="rounded-md" />
              <div className="border rounded-xl mx-2">
                <h1 className="p-2">Filter</h1>
                <Separator className="bg-white" />
                <div className="p-5">
                  <RadioGroup defaultValue="option-one">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="option-one" id="option-one" />
                      <Label htmlFor="option-one">Option One</Label>
                    </div>
                    <div className="flex items-center space-x-2 ">
                      <RadioGroupItem value="option-two" id="option-two" />
                      <Label htmlFor="option-two">Option Two</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;

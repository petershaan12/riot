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
          <p>Events</p>
        </div>
      </section>
    </>
  );
};

export default Page;

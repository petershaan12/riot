"use client";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { eventsFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { eventDefaultValues } from "@/constants";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/profile/dropdown";

type EventsFormProps = {
  userId: string;
  type: "create" | "edit";
};

const Page = ({ userId, type }: EventsFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const initialValues = eventDefaultValues;
  const form = useForm<z.infer<typeof eventsFormSchema>>({
    resolver: zodResolver(eventsFormSchema),
    defaultValues: initialValues,
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
            <h1 className="text-5xl uppercase font-bold">Create Events</h1>
            <p className="opacity-50">Try make new Events</p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mb-12"
            >
              <div className="space-y-4 md:min-w-[500px] min-w-[250px] text-start">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Event Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="event title"
                          className="bg-transparent text-white rounded-md placeholder-white/10"
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Dropdown
                          value={field.value}
                          onChangeHandler={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Page;

"use client";
import { toast } from "sonner";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaLocationDot } from "react-icons/fa6";
import { eventsFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { eventDefaultValues } from "@/constants";
import { Input } from "@/components/ui/input";
import Dropdown from "@/components/events/dropdown";
import { Textarea } from "../ui/textarea";
import FileUploader from "./file-upload";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { SlCalender } from "react-icons/sl";
import { PickCalender } from "./pick-calender";
import Image from "next/image";
import { DollarSign, Link } from "lucide-react";
import { FaDollarSign } from "react-icons/fa";
import { Checkbox } from "../ui/checkbox";
import { createEvent } from "@/app/actions/events";
import { useRouter } from "next/navigation";

type EventsFormProps = {
  userId: string;
  type: "create" | "edit";
};

export const EventForm = ({ userId, type }: EventsFormProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const initialValues = eventDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof eventsFormSchema>>({
    resolver: zodResolver(eventsFormSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: z.infer<typeof eventsFormSchema>) => {
    setError("");
    setSuccess("");

    const toastId = toast.loading("Creating event...");
    console.log("categoryId", values.categoryId);

    startTransition(() => {
      createEvent(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast.dismiss(toastId);
          }
          if (data.success) {
            setSuccess(data.success);
            toast.success(data.success, { id: toastId });
            form.reset();
            router.push(`/events/${values.url}`);
          }
        })
        .catch((error) => {
          setError(error.message);
          toast.dismiss(toastId);
        });
    });

    console.log("halo semua");
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 mb-12"
        >
          <div className="space-y-4 flex flex-col text-start">
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
                      placeholder="Example: Running 5K"
                      className=" text-white rounded-md placeholder-white/10"
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
                      onFieldChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="md:flex md:space-x-5 md:space-y-0 space-y-5 md:pb-12">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Example: Join us for an exhilarating 5k run through scenic trails. Whether you're a seasoned runner or just starting out,"
                        className=" h-full md:w-[400px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <FileUploader
                        imageUrl={field.value}
                        onFieldChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <div className="flex justify-center items-center ">
                      <FaLocationDot className="w-6 h-6 mx-2 opacity-70" />
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Event location or Online"
                        className=" text-white rounded-md placeholder-white/10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <div className="flex justify-center items-center ">
                      <SlCalender className="w-6 h-6 mx-2 opacity-70" />
                      <div className="w-full flex justify-center items-center border p-2 rounded-md text-sm">
                        <DatePicker
                          selected={field.value}
                          onChange={(date: Date | null) => field.onChange(date)}
                          showTimeSelect
                          timeInputLabel="Time:"
                          dateFormat="MM/dd/yyyy h:mm aa"
                          wrapperClassName="datePicker "
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex justify-center items-center">
                      <FaDollarSign className="w-6 h-6 mx-2 opacity-70" />
                      <Input
                        {...field}
                        type="number"
                        disabled={isPending || form?.watch("isFree")} // Disable jika free ticket dipilih
                        placeholder="Price"
                        className=" text-white rounded-md placeholder-white/10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFree"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex ml-5 items-center">
                      <Checkbox
                        className="mr-2 h-5 w-5 border-2"
                        onCheckedChange={field.onChange}
                        checked={field.value}
                      />
                      <label
                        htmlFor="isFree"
                        className="text-xs checked:text-black"
                      >
                        Free Ticket
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Create link for this Event</FormLabel>
                  <FormControl>
                    <div className="flex justify-center items-center">
                      <Link className="w-6 h-6 mx-2 opacity-70" />
                      <div className="flex items-center border border-1 w-full rounded-md focus:ring-primary focus:ring-2">
                        <p className="border-r-2 px-3 ml-2 text-sm opacity-90">
                          riot.com/
                        </p>
                        <Input
                          {...field}
                          disabled={isPending} // Disable jika free ticket dipilih
                          placeholder="Example: running5k"
                          className="ml-1 border-none focus-visible:ring-0 focus:ring-0  text-white rounded-md placeholder-white/10"
                        />
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Link must be start with alphabet, without space (opsional)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            type="submit"
            disabled={isPending}
            className="w-full text-black font-monument-regular uppercase text-xl"
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};
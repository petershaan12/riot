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
import { DollarSign } from "lucide-react";
import { FaDollarSign } from "react-icons/fa";
import { Checkbox } from "../ui/checkbox";

type EventsFormProps = {
  userId: string;
  type: "create" | "edit";
};

export const EventForm = ({ userId, type }: EventsFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isFreeTicket, setIsFreeTicket] = useState(false);
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
            <div className=" flex space-x-5 pb-12">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        className="bg-transparent h-full w-[300px]"
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
                        onFieldChange={field.onChange}
                        imageUrl={field.value}
                        setFiles={setFiles}
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
                        className="bg-transparent text-white rounded-md placeholder-white/10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <div className="flex justify-center items-center ">
                      <SlCalender className="w-6 h-6 mx-2 opacity-70" />
                      <div className="w-full flex justify-center items-center border p-2 rounded-md text-sm">
                        <p className="text-xs w-[100px] border-r-2">
                          Start Date{" "}
                        </p>
                        <DatePicker
                          selected={field.value}
                          onChange={(date: Date) => field.onChange(date)}
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
              name="endDateTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex justify-center items-center ">
                      <SlCalender className="w-6 h-6 mx-2 opacity-70" />
                      <div className="w-full flex justify-center items-center border p-2 rounded-md text-sm">
                        <p className="text-xs w-[100px] border-r-2">
                          End Date{" "}
                        </p>
                        <DatePicker
                          selected={field.value}
                          onChange={(date: Date) => field.onChange(date)}
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="flex justify-center items-center">
                      <FaDollarSign className="w-6 h-6 mx-2 opacity-70" />
                      <Input
                        {...field}
                        disabled={isPending || isFreeTicket} // Disable jika free ticket dipilih
                        placeholder="Price"
                        className="bg-transparent text-white rounded-md placeholder-white/10"
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
                        id="isFree"
                        className="mr-2 h-5 w-5 border-2"
                        checked={isFreeTicket}
                        onChange={(e) => setIsFreeTicket(field.value)} // Update state ketika checkbox berubah
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

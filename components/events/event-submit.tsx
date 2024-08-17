"use client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { EventAttendeeSchema } from "@/schemas";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { attendEvent } from "@/app/actions/events";
import { useRouter } from "next/navigation";

const EventSubmit = ({
  user,
  event,
  onClose,
}: {
  user: any;
  event: any;
  onClose: () => void;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof EventAttendeeSchema>>({
    resolver: zodResolver(EventAttendeeSchema),
    defaultValues: {
      phone: "",
    },
  });

  console.log(event);

  const onSubmit = async (values: z.infer<typeof EventAttendeeSchema>) => {
    setError("");
    setSuccess("");
    const toastId = toast.loading("Register in");
    // console.log(values.phone);

    startTransition(() => {
      attendEvent(event, user, values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast.dismiss(toastId);
          }
          if (data.success) {
            toast.success(data.success, {
              id: toastId,
            });
            onClose();

            window.open(`/ticket/${data.ticketId}`, "_blank");
          }
        })
        .catch((error) => {
          setError(error.message);
          toast.dismiss(toastId);
        });
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <DialogHeader>
          <DialogTitle className="text-start">Your Info</DialogTitle>
          <DialogDescription>
            <div className="flex text-white items-center text-start">
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.image || ""} />
                <AvatarFallback>
                  <p className="font-bold uppercase">
                    {user.name.substring(0, 2)}
                  </p>
                </AvatarFallback>
              </Avatar>
              <div className="p-3">
                <h1 className="font-bold">{user.name}</h1>
                <p className="opacity-50">{user.email}</p>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="phone">Phone Number*</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="phone"
                    disabled={isPending}
                    placeholder="+62 895 2988 2952"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Make sure your phone number is correct
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <DialogFooter>
          <Button
            type="submit"
            disabled={isPending}
            className="text-black w-full font-monument-regular text-lg"
          >
            SUBMIT
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default EventSubmit;

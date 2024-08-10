"use client";

import { ubahProfile } from "@/app/actions/settings";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/use-current-user";
import { SettingSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const Page = () => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const initialValues = {
    name: user?.name || undefined,
    image: undefined,
    username: user?.username || undefined,
    email: user?.email || undefined,
    bio: user?.bio || undefined,
    password: undefined,
    newPassword: undefined,
  };

  const form = useForm<z.infer<typeof SettingSchema>>({
    resolver: zodResolver(SettingSchema),
    defaultValues: initialValues,
  });

  const { watch } = form;

  const isFormDirty =
    watch("name") !== initialValues.name ||
    watch("username") !== initialValues.username ||
    watch("email") !== initialValues.email ||
    watch("bio") !== initialValues.bio ||
    watch("image") !== initialValues.image ||
    watch("password") !== initialValues.password ||
    watch("newPassword") !== initialValues.newPassword;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const file = e.target.files?.[0];
    if (file) {
      const fileType = file.type;
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (validTypes.includes(fileType)) {
        if (file.size < 1024 * 1024 * 5) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            setPreviewImage(base64String);
            // Update form state with base64 image
            form.setValue("image", base64String);
          };
          reader.readAsDataURL(file);
        } else {
          setError("Image is more than 5MB");
        }
      } else {
        setError("Only .png or .jpg files are accepted");
      }
    }
  };

  const onSubmit = (values: z.infer<typeof SettingSchema>) => {
    setError("");
    setSuccess("");
    const toastId = toast.loading("Updating Profile");

    const cleanedValues = {
      ...values,
      ...(values.password ? { password: values.password } : {}),
      ...(values.newPassword ? { newPassword: values.newPassword } : {}),
      ...(values.image ? { image: values.image } : {}),
    };

    startTransition(() => {
      ubahProfile(cleanedValues)
        .then((data) => {
          if (data.error) {
            setError(data.error);
            toast.dismiss(toastId);
          }

          if (data.success) {
            update();
            setSuccess(data.success);
            toast.success(data.success, { id: toastId });
          }
        })
        .catch((error) => {
          setError(error.message);
          toast.dismiss(toastId);
        });
    });
  };

  return (
    <>
      <section className=" p-5 md:py-10 flex flex-col ">
        <ArrowLeft
          className="w-4 hover:cursor-pointer"
          strokeWidth={3}
          onClick={() => router.push("/profile")}
        />
        <div className="flex flex-col items-center  w-full text-center gap-5 ">
          <Avatar className="cursor-pointer md:w-[200px] md:h-[200px]">
            <AvatarImage
              src={previewImage || user?.image}
              alt="Profile Image"
            />
            <AvatarFallback>
              <p className="text-4xl font-bold uppercase">
                {user?.name?.substring(0, 2)}
              </p>
            </AvatarFallback>
          </Avatar>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 mb-12"
            >
              <div className="space-y-4 md:min-w-[500px] min-w-[250px] text-start">
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Image</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          id="picture"
                          type="file"
                          className="text-white"
                          onChange={handleImageChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fullname</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john doe"
                          className="bg-transparent text-white rounded-md placeholder-white/10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="@yourusername"
                          className="bg-transparent text-white rounded-md placeholder-white/10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder="john.doe@example.com"
                          type="email"
                          className="bg-transparent text-white rounded-md placeholder-white/10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bio"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          placeholder="Write something about yourself"
                          className="bg-transparent text-white rounded-md placeholder-white/10"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {user?.isOAuth === false && (
                  <>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passwword</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="*******"
                              type="password"
                              className="bg-transparent text-white rounded-md placeholder-white/10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Passwword</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="*******"
                              type="password"
                              className="bg-transparent text-white rounded-md placeholder-white/10"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Separator className="border border-white mt-5 mx-auto" />
              <Button
                type="submit"
                disabled={isPending || !isFormDirty}
                className={`w-full text-black font-monument-regular uppercase text-xl ${
                  isPending || !isFormDirty
                    ? "opacity-20 hover:cursor-not-allowed "
                    : "opacity-100"
                }`}
              >
                SAVE
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Page;

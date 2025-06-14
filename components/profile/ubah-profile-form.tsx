"use client";

import Loading from "@/app/(root)/loading";
import { ubahProfile } from "@/app/actions/settings";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profilDefaultValues } from "@/constants";
import { UserSettingSchema, AdminSettingSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTransition, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ubahProfileAdmin } from "@/app/actions/admin";
import React from "react";

export const UbahProfileForm = ({
  user,
  isOAuth,
  isAdmin,
}: {
  user: any;
  isOAuth?: boolean;
  isAdmin?: boolean;
}) => {
  const [error, setError] = useState<string | undefined>();
  const [errorImage, setErrorImage] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const { update } = useSession();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const initialValues = {
    ...profilDefaultValues,
    name: user?.name || profilDefaultValues.name,
    username: user?.username || profilDefaultValues.username,
    email: user?.email || profilDefaultValues.email,
    bio: user?.bio || profilDefaultValues.bio,
    role: user?.role || profilDefaultValues.role,
    points: user?.points || profilDefaultValues.points,
  };

  // Use appropriate schema based on user role
  const schema = isAdmin ? AdminSettingSchema : UserSettingSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    if (user) {
      form.reset(initialValues);
    }
  }, [user, form.reset]);

  const { watch } = form;
  const isFormDirty =
    watch("name") !== initialValues.name ||
    watch("username") !== initialValues.username ||
    watch("bio") !== initialValues.bio ||
    watch("image") !== initialValues.image ||
    watch("password") !== initialValues.password ||
    watch("newPassword") !== initialValues.newPassword ||
    (isAdmin && (watch as any)("role") !== initialValues.role) ||
    (isAdmin && (watch as any)("points") !== initialValues.points);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorImage("");
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
            form.setValue("image", base64String);
          };
          reader.readAsDataURL(file);
        } else {
          setErrorImage("Image is more than 5MB");
        }
      } else {
        setErrorImage("Only .png or .jpg files are accepted");
      }
    }
  };

  const onSubmit = (values: z.infer<typeof schema>) => {
    setError("");
    setSuccess("");
    const toastId = toast.loading("Updating Profile"); // Only include fields that are allowed for each user type
    const cleanedValues = isAdmin
      ? {
          ...values,
          ...(values.email ? { email: values.email } : {}),
          ...(values.password ? { password: values.password } : {}),
          ...(values.newPassword ? { newPassword: values.newPassword } : {}),
          ...(values.image ? { image: values.image } : {}),
          ...((values as any).role ? { role: (values as any).role } : {}),
          ...((values as any).points ? { points: (values as any).points } : {}),
        }
      : {
          // For regular users, only allow safe fields
          name: values.name,
          username: values.username,
          bio: values.bio,
          ...(values.image ? { image: values.image } : {}),
          ...(values.password ? { password: values.password } : {}),
          ...(values.newPassword ? { newPassword: values.newPassword } : {}),
        };

    startTransition(() => {
      const ubahProfileFunction = isAdmin ? ubahProfileAdmin : ubahProfile;

      ubahProfileFunction(cleanedValues, user.id)
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

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <ArrowLeft
        className="w-4 hover:cursor-pointer hover:text-primary"
        strokeWidth={3}
        onClick={() => router.back()}
      />
      <div className="flex flex-col items-center  w-full text-center gap-5 ">
        <Avatar className="cursor-pointer w-[200px] h-[200px]">
          <AvatarImage src={previewImage || user?.image} alt="Profile Image" />
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
                render={() => (
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
              <FormError message={errorImage} />
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
                        disabled={true}
                        placeholder="john.doe@example.com"
                        type="email"
                        className="bg-transparent text-white rounded-md placeholder-white/10"
                      />
                    </FormControl>
                    <FormDescription>Email cannot be changed</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />{" "}
              {isAdmin && (
                <>
                  <FormField
                    control={form.control}
                    name={"role" as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              const roleValue = parseInt(value);
                              (form.setValue as any)(
                                "role",
                                roleValue.toString()
                              );
                              field.onChange(value);
                            }}
                            disabled={isPending}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Role" />
                            </SelectTrigger>
                            <SelectContent className="bg-black">
                              <SelectItem value="0">Admin</SelectItem>
                              <SelectItem value="1">
                                Officer Riot Indonesia
                              </SelectItem>
                              <SelectItem value="2">Officer Chapter</SelectItem>
                              <SelectItem value="3">Spartan</SelectItem>
                              <SelectItem value="4">User</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={"points" as any}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Points</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="User Points"
                            type="number"
                            className="bg-transparent text-white rounded-md placeholder-white/10"
                            onChange={(e) =>
                              field.onChange(parseInt(e.target.value, 10))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
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
              {isOAuth === false && !isAdmin && (
                <>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Old Password</FormLabel>
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
                        <FormLabel>New Password</FormLabel>
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
              {isAdmin && isOAuth === false && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
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
    </>
  );
};

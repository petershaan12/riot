import { start } from "repl";
import * as z from "zod";

export const SettingSchema = z
  .object({
    name: z.string().optional(),
    username: z.string().optional(),
    image: z.string().url().optional(),
    email: z.string().email().optional(),
    bio: z
      .string()
      .min(3, "Title must be at least 3 characters long")
      .max(150, "Title must be at most 150 characters long")
      .optional(),
    password: z.string().min(6).optional(),
    newPassword: z.string().min(6).optional(),
  })
  .refine(
    (data) => {
      // Check that if newPassword is provided, password must also be provided
      if (data.newPassword && !data.password) {
        return false;
      }
      // Check that if password is provided, newPassword must also be provided
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message:
        "If you provide a new password, the current password is required and vice versa",
    }
  );

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 Characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const eventsFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long")
    .max(400, "Description must be at most 400 characters long"),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters long")
    .max(400, "Location must be at most 400 characters long"),
  imageUrl: z.string(),
  dateTime: z.date(),
  categoryId: z.string(),
  isFree: z.boolean(),
  price: z.string(),
  url: z.string(),
});


export const categoriesSchema = z.object({
  name: z.string(),
});
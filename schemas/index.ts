import * as z from "zod";

export const SettingSchema = z.object({
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
  role: z.string().optional(),
  points: z.number().optional(),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const UsernameSchema = z.object({
  username: z.string().min(3, {
    message: "Username is required",
  }),
});

export const EventAttendeeSchema = z.object({
  phone: z
    .string()
    .min(10, { message: "Enter valid phone number" })
    .max(15, { message: "Enter valid phone number" }),
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
  userId: z.string(),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long")
    .max(400, "Description must be at most 400 characters long"),
  buildingName: z.string(),
  location: z
    .string()
    .min(3, "Location must be at least 3 characters long")
    .max(400, "Location must be at most 400 characters long"),
  chapter: z.string(),
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

export const organisasiFormSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
});

export const organisasiEditFormSchema = z.object({
  name: z.string().optional(),
  username: z.string().optional(),
  image: z.string().url().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
  role: z.string().optional(),
});

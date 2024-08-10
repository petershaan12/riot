import * as z from "zod"

export const SettingSchema = z
  .object({
    name: z.string().optional(),
    username: z.string().optional(),
    image: z.string().url().optional(),
    email: z.string().email().optional(),
    bio: z.string().optional(),
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
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    })
})

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 Characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
})


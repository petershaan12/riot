import { UserRole } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  createdAt: string;
  role: UserRole;
  username: string;
  isOAuth: boolean;
  image: string;
};

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

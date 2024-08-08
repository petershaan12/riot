import NextAuth, { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  createdAt: string;
};

declare module "next-auth" {
  interface Session {
    user: User;
  }
}

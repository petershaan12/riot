import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { db } from "./db";
import { getAccountByUserId, getUserById } from "@/app/actions/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) throw new Error("Please provide all field");

        let user: any = await db.user.findFirst({ where: { email } });
        if (!user) throw new Error("User not found");

        const isMatch = await compare(password, user.password);

        if (!isMatch) throw new Error("Password Salah");

        return user;
      },
    }),
  ],

  debug: true,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },

  callbacks: {
    jwt: async ({ token }) => {
      if (!token.sub) return token;
      // console.log(token.sub);
      const existingUser = await getUserById(token.sub);

      if (!existingUser) {
        // console.log("User not found for id:", token.sub);
        return token; // Return the token as is if no user is found
      }

      const existingAccount = await getAccountByUserId(existingUser.id);
      token.isOAuth = !!existingAccount;
      token.role = existingUser.role;
      token.bio = existingUser.bio;
      token.createdAt = existingUser.createdAt;
      token.username = existingUser.username;
      token.image = existingUser.image;

      return token;
    },
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.createdAt = token.createdAt;
        session.user.role = token.role;
        session.user.bio = token.bio;
        session.user.username = token.username;
        session.user.image = token.image;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
  },
});

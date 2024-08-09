import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { db } from "./db";
import { getUserById } from "@/app/actions/auth";

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

        const isMatch = await compare(password, user.hashedPassword);

        if (!isMatch) throw new Error("Password Salah");

        return user;
      },
    }),
  ],

  debug: true,
  pages: {
    signIn: "/login",
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
      // console.log(existingUser)
      token.role = existingUser.role;
      token.createdAt = existingUser.createdAt;
      return token;
    },
    session: async ({ token, session }) => {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.createdAt && session.user) {
        session.user.createdAt = token.createdAt;
        session.user.role = token.role;
      }

      return session;
    },
  },
});

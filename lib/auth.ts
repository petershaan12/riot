import NextAuth, { AuthError } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { connectToDatabase } from "./database";
import { User } from "./database/models/userModel";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    CredentialProvider({
      name: "Credentials",
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

        console.log(email, password);

        if (!email || !password) {
          return Error("Please Provide Email and Password");
        }

        //Connect With Database
        await connectToDatabase();

        const user = await User.findOne({ email }).select("+password");

        if (!user) throw new Error("Email Belum Terdaftar");

        const isMatch = await compare(password, user.password);

        if (!isMatch) throw new Error("Password Salah");

        const userData = {
          name: user.name,
          email: user.email,
          id: user._id,
        };

        return userData;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      if (account?.provider === "credentials") {
        return true;
      }
      if (account?.provider === "google") {
        try {
          const { id, name, email, image } = user;
          await connectToDatabase();

          const alreadyUser = await User.findOne({ email });

          console.log("alreadyUser", !alreadyUser);

          if (!alreadyUser) {
            try {
              await User.create({ email, name, image, googleId: id });
            } catch (error) {
              console.error("Error saat create user:", error);
              throw new AuthError("Gagal membuat pengguna");
            }
          }

          console.log("berhasil create user");

          return true;
        } catch (error) {
          throw new AuthError("Gagal Login");
        }
      }
      return false;
    },
  },
});

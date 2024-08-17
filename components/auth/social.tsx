"use client";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";

export const Social = () => {
  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        onClick={() => onClick("google")}
        type="submit"
        size="lg"
        className="w-full bg-white rounded-lg text-black font-medium hover:bg-white"
      >
        <FcGoogle className="w-5 h-5 mr-2" /> Continue with Google
      </Button>
    </div>
  );
};

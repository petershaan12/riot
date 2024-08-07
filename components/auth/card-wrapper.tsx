import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Social } from "@/components/auth/social";
import Image from "next/image";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth";

interface CardWrapperProps {
  children: React.ReactNode;
  showSocial?: boolean;
}

export const CardWrapper = ({ children, showSocial }: CardWrapperProps) => {
  return (
    <Card className="w-[400px] bg-[#393939]/20 rounded-2xl border border-white/20 pt-5 shadow-lg ring-1 ring-black/5 isolate  text-white">
      <CardHeader>
        <Link href="/">
          <Image
            src="/assets/images/logo.svg"
            width={128}
            height={28}
            alt="riot Logo"
            className="mx-auto"
          />
        </Link>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <p className="mx-auto text-xs flex justify-center py-5">
        or continue with
      </p>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
    </Card>
  );
};

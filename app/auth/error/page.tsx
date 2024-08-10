import { CardWrapper } from "@/components/auth/card-wrapper";
import { ErrorCard } from "@/components/auth/error-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const NotFound = () => {
  return (
    <>
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
        <CardContent>
          {" "}
          <ErrorCard />
        </CardContent>
        <p className="mx-auto text-xs flex justify-center py-5">
          <Link href="/auth/login" className="hover:underline mx-1">
            Go Back Login
          </Link>
        </p>
      </Card>
    </>
  );
};

export default NotFound;

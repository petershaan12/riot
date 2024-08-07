import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { Separator } from "../ui/separator";
import { auth } from "@/lib/auth";
import Logout from "../auth/logout";
import { getCurrentTime } from "@/lib/utils";

const Header = async () => {
  const session = await auth();
  const currentTime = getCurrentTime();

  return (
    <header className="w-full wrapper z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center ">
          <Link href="/" className="w-36">
            <Image
              src="/assets/images/logo.svg"
              width={100}
              height={20}
              alt="riot Logo"
            />
          </Link>

          <nav>
            <NavItems session={session} />
          </nav>
        </div>

        <div className="flex gap-3 items-center">
          <p>{currentTime}</p>
          {!session?.user ? (
            <Button
              asChild
              className="rounded-full bg-white/10 backdrop-blur-xl"
            >
              <Link href="/auth/login" className="text-sm px-7">
                Join Now
              </Link>
            </Button>
          ) : (
            <Logout />
          )}
        </div>
      </div>

      <Separator className="border-1 mt-5 mx-auto opacity-60" />
    </header>
  );
};

export default Header;

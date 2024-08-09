import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { Separator } from "../ui/separator";
import { auth } from "@/lib/auth";
import Logout from "../auth/logout";
import { getCurrentTime } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { BellIcon, SearchIcon } from "lucide-react";

const Header = async () => {
  const session = await auth();
  const currentTime = getCurrentTime();

  return (
    <header className="w-full wrapper z-10 ">
      <div className="flex items-center px-2 justify-between">
        <div className="flex items-center ">
          <Link href="/" className="w-36">
            <Image
              src="/assets/images/logo.svg"
              width={100}
              height={20}
              alt="riot Logo"
            />
          </Link>

          <nav className="hidden md:block">
            <NavItems isLogin={!!session} />
          </nav>
        </div>

        <div className="flex  gap-3 items-center">
          <p className="opacity-50">{currentTime}</p>
          <SearchIcon className="w-4 opacity-50" strokeWidth={3} />
          <BellIcon className="w-4 opacity-50" strokeWidth={3} />
          {!session?.user ? (
            <Button
              asChild
              className="rounded-full items-center hidden md:flex bg-white/10 backdrop-blur-xl"
            >
              <Link href="/auth/login" className="text-sm px-7">
                Join Now
              </Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={session?.user?.image || ""} />
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <MobileNav isLogin={!!session} />
        </div>
      </div>

      <Separator className="border-1 mt-5 mx-auto opacity-60" />
    </header>
  );
};

export default Header;

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import Logout from "../auth/logout";
import { getCurrentTime } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { BellIcon, SearchIcon, Settings } from "lucide-react";
import { UserRole } from "@prisma/client";
import SearchRiot from "./SearchRiot";

const Header = async () => {
  const session = await auth();
  const currentTime = getCurrentTime();
  const isOrganization = (role: UserRole): boolean => role === UserRole.ORGANIZATION;
  const isAdmin = (role: UserRole): boolean => role === UserRole.ADMIN;

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
            <NavItems
              isLogin={!!session}
              isAdmin={isAdmin(session?.user?.role)}
              isOrganization={isOrganization(session?.user?.role)}
            />
          </nav>
        </div>

        <div className="flex  gap-3 items-center">
          <p className="opacity-50 sm:text-base text-sm">{currentTime}</p>
          <SearchRiot />
          {/* <BellIcon
            className="w-4 opacity-50 hidden md:block"
            strokeWidth={3}
          /> */}
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
                  <AvatarFallback>
                    <p className="font-bold uppercase">
                      {session?.user?.name?.substring(0, 2)}
                    </p>
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="hover:cursor-pointer ">
                  <Link href="/profile" className="flex items-center">
                    <Settings className="w-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:cursor-pointer ">
                  <Logout />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <MobileNav
            isLogin={!!session}
            isOrganization={isOrganization(session?.user?.role)}
          />
        </div>
      </div>

      <Separator className="border-1 mt-5 mx-auto opacity-60" />
    </header>
  );
};

export default Header;

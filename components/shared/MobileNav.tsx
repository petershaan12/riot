import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import NavItems from "./NavItems";
import { auth } from "@/lib/auth";
import { getCurrentTime } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import Logout from "../auth/logout";

interface MobileNavProps {
  isLogin: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({ isLogin }) => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle border border-white/10 rounded-lg p-2">
          <Menu />
        </SheetTrigger>
        <SheetContent className="flex flex-col bg-black gap-10 md:hidden border-l-primary/50 ">
          <Image
            src="/assets/images/logo.svg"
            width={80}
            height={10}
            alt="riot Logo"
          />
          <NavItems isLogin={isLogin} />
          {!isLogin ? (
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
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;

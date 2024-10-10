import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Image from "next/image";
import NavItems from "./NavItems";
import { Button } from "../ui/button";
import Link from "next/link";
import Logout from "../auth/logout";

interface MobileNavProps {
  isLogin: boolean;
  isOfficer: boolean;
  isAdmin: boolean;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isLogin,
  isOfficer,
  isAdmin,
}) => {
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

          <NavItems isLogin={isLogin} isOfficer={isOfficer} isAdmin={isAdmin} />
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

"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItemsProps {
  isLogin: boolean;
  isOfficer: boolean;
  isAdmin: boolean;
}

const NavItems: React.FC<NavItemsProps> = ({ isLogin, isAdmin, isOfficer }) => {
  const pathname = usePathname();

  const filteredNavItems = headerLinks.filter((item) => {
    if (item.protected) {
      if (item.label === "Create Event" && !(isOfficer || isAdmin)) {
        return false;
      }
      if (item.label === "Account" && !isAdmin) {
        return false;
      }
      if (item.label === "Rank Point" && !isAdmin) {
        return false;
      }
      return isLogin;
    }
    return true;
  });
  // console.log("filteredNavItems:", filteredNavItems);
  return (
    <ul className="flex flex-col items-start gap-5 md:flex-row">
      {filteredNavItems.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive ? "text-white opacity-100" : "opacity-50"
            } flex-center p-medium-4 whitespace-nowrap hover:text-primary  hover:opacity-100`}
          >
            <Link href={link.route} className="text-sm ">
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavItems;

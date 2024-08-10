"use client";

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavItemsProps {
  isLogin: boolean;
}

const NavItems: React.FC<NavItemsProps> = ({ isLogin }) => {
  const pathname = usePathname();
  // console.log("isLogin prop:", isLogin);

  const filteredNavItems = headerLinks.filter((item) => {
    if (item.protected) {
      return isLogin;
    }
    return true;
  });
  return (
    <ul className="flex flex-col items-start gap-5 md:flex-row">
      {filteredNavItems.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive ? "text-primary-500 opacity-100" : "opacity-50"
            } flex-center p-medium-4 whitespace-nowrap hover:text-primary-500  hover:opacity-100`}
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

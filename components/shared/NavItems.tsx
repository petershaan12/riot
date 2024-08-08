"use client";
import { headerLinks } from "@/constants";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = ({ session }: any) => {
  const pathname = usePathname();

  const filteredNavItems = headerLinks.filter((item) => {
    if (item.protected) {
      return session?.user;
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
            } flex-center p-medium-4 whitespace-nowrap hover:text-primary-500`}
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

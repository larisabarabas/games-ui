"use client";
import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigationItems } from "@/lib/data";

const NavItems = () => {
  const pathName = usePathname();

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navigationItems.map((item) => {
        const IconComponent = item.iconComponent;
        return (
          <Link
            key={item.id}
            href={item.path}
            className={
              pathName === item.path
                ? `flex items-center gap-3 rounded-lg  px-3 py-2 transition-all font-medium mb-2 bg-slate-200`
                : `flex items-center gap-3 rounded-lg  px-3 py-2 transition-all mb-2 hover:text-primary hover:bg-slate-200`
            }
          >
            <IconComponent className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;

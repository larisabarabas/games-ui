import React from "react";
import Link from "next/link";

import { Gamepad2 } from "lucide-react";

import { navigationItems } from "@/lib/data";

const NavItemsMobile = () => {
  return (
    <nav className="grid gap-2 text-lg font-medium">
      <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
        <Gamepad2 className="h-6 w-6" />
        <span>Games Studio XYZ</span>
      </Link>

      {navigationItems.map((item) => {
        const IconComponent = item.iconComponent;
        return (
          <Link
            key={item.id}
            href={item.path}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-primary hover:bg-gray-100"
          >
            <IconComponent className="h-5 w-5" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItemsMobile;

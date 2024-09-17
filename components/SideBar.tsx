import React from "react";
import Link from "next/link";

import { Gamepad2 } from "lucide-react";

import NavItems from "@/components/NavItems";

const SideBar = () => {
  return (
    <div className="hidden border-r bg-gray-50 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Gamepad2 className="h-6 w-6" />
            <span className="">Game Studio XYZ</span>
          </Link>
        </div>
        <div className="flex-1">
          <NavItems />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

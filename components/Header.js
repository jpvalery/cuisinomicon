import { useState } from "react";
import { Transition, Menu } from "@headlessui/react";
import NextLink from "next/link";
import React from "react";
import CookBook from "../elements/iconset/CookBook";
import CuttingBoard from "../elements/iconset/CuttingBoard";
import Lemonade from "../elements/iconset/Lemonade";

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  return (
    <div className="sticky top-0 z-50 max-w-3xl pt-4 mx-auto bg-gradient-to-b from-eigengrau-600">
      <div className="flex items-center justify-between p-4 border-b-2 border-gray-800">
        <NextLink href="/">
          <div className="w-8 h-8 text-base font-medium outline-none cursor-pointer md:w-10 md:h-10 text-main-500 group hover:text-main-100">
            <CookBook />
            <span className="sr-only">Cuisinomicon</span>
          </div>
        </NextLink>

        <div className="grid items-center grid-flow-col gap-6">
          <NextLink href="/manger">
            <div className="w-8 h-8 text-base font-medium outline-none cursor-pointer md:w-10 md:h-10 text-manger-500 group hover:text-manger-100">
              <CuttingBoard />
              <span className="sr-only">Manger</span>
            </div>
          </NextLink>

          <NextLink href="/manger">
            <div className="w-8 h-8 text-base font-medium outline-none cursor-pointer md:w-10 md:h-10 text-boire-500 group hover:text-boire-100">
              <Lemonade />
              <span className="sr-only">Boire</span>
            </div>
          </NextLink>
        </div>
      </div>
    </div>
  );
}

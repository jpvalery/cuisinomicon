import NextLink from "next/link";
import React from "react";

import CookBook from "../elements/iconset/CookBook";
import CuttingBoard from "../elements/iconset/CuttingBoard";
import Lemonade from "../elements/iconset/Lemonade";

export default function Header() {
  return (
    <div className="sticky top-0 z-50">
      <div className="pt-4 bg-eigengrau-600">
        <div className="flex items-center justify-between max-w-4xl px-4 pt-4 pb-6 mx-auto text-base font-medium border-b-2 border-yellow-700 border-opacity-80">
          <NextLink href="/">
            <div className="w-8 h-8 outline-none cursor-pointer md:w-10 md:h-10 text-brand-600 hover:text-red-100">
              <span className="sr-only">Cuisinomicon</span>
              <CookBook />
            </div>
          </NextLink>

          <div className="grid items-center grid-flow-col gap-6">
            <NextLink href="/manger">
              <div className="w-8 h-8 outline-none cursor-pointer md:w-10 md:h-10 text-manger-500 hover:text-manger-100">
                <span className="sr-only">Manger</span>
                <CuttingBoard />
              </div>
            </NextLink>

            <NextLink href="/boire">
              <div className="w-8 h-8 outline-none cursor-pointer md:w-10 md:h-10 text-boire-500 hover:text-boire-100">
                <span className="sr-only">Boire</span>
                <Lemonade />
              </div>
            </NextLink>
          </div>
        </div>
      </div>
      <div className="w-full h-12 bg-gradient-to-b from-eigengrau-600"></div>
    </div>
  );
}

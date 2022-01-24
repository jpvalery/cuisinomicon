import NextLink from "next/link";
import React from "react";

import CookBook from "../elements/iconset/CookBook";
import CuttingBoard from "../elements/iconset/CuttingBoard";
import Lemonade from "../elements/iconset/Lemonade";

export default function Header() {
  return (
    <div className="sticky top-0 z-50">
      <div className="bg-eigengrau-600 pt-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between border-b-2 border-yellow-700 border-opacity-80 px-4 pt-4 pb-6 text-base font-medium">
          <NextLink href="/">
            <div className="h-8 w-8 cursor-pointer text-brand-600 outline-none hover:text-red-100 md:h-10 md:w-10">
              <span className="sr-only">Cuisinomicon</span>
              <CookBook />
            </div>
          </NextLink>

          <div className="grid grid-flow-col items-center gap-6">
            <NextLink href="/manger">
              <div className="h-8 w-8 cursor-pointer text-manger-500 outline-none hover:text-manger-100 md:h-10 md:w-10">
                <span className="sr-only">Manger</span>
                <CuttingBoard />
              </div>
            </NextLink>

            <NextLink href="/boire">
              <div className="h-8 w-8 cursor-pointer text-boire-500 outline-none hover:text-boire-100 md:h-10 md:w-10">
                <span className="sr-only">Boire</span>
                <Lemonade />
              </div>
            </NextLink>
          </div>
        </div>
      </div>
      <div className="h-12 w-full bg-gradient-to-b from-eigengrau-600"></div>
    </div>
  );
}

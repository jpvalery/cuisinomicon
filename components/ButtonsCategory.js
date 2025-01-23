import NextLink from "next/link";
import React from "react";

import CookBook from "../elements/iconset/CookBook";
import CuttingBoard from "../elements/iconset/CuttingBoard";
import Lemonade from "../elements/iconset/Lemonade";

export default function ButtonsCategory() {
  return (
    <section className="grid grid-flow-row items-center justify-center gap-8 py-20 md:grid-flow-col">
      <NextLink href="/manger">
        <div className="inline-flex cursor-pointer items-center rounded-md border border-transparent bg-manger-600 px-4 py-3 text-xl font-medium text-white shadow-xs hover:bg-manger-700 focus:outline-hidden focus:ring-2 focus:ring-manger-200 focus:ring-offset-2 md:w-72">
          <div className="mr-4 h-6 w-6">
            <CuttingBoard />
          </div>
          Recettes à manger&nbsp;→
        </div>
      </NextLink>
      <div className="-ml-1 hidden h-8 w-8 text-brand-600 md:inline">
        <CookBook />
      </div>
      <NextLink href="/boire">
        <div className="inline-flex cursor-pointer items-center rounded-md border border-transparent bg-boire-600 px-6 py-3 text-xl font-medium text-white shadow-xs hover:bg-boire-700 focus:outline-hidden focus:ring-2 focus:ring-boire-200 focus:ring-offset-2 md:w-72">
          <div className="mr-4 h-6 w-6">
            <Lemonade />
          </div>
          Recettes à boire&nbsp;→
        </div>
      </NextLink>
    </section>
  );
}

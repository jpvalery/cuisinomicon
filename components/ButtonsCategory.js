import NextLink from "next/link";
import React from "react";

import CookBook from "../elements/iconset/CookBook";
import CuttingBoard from "../elements/iconset/CuttingBoard";
import Lemonade from "../elements/iconset/Lemonade";

export default function ButtonsCategory() {
  return (
    <section className="grid items-center justify-center grid-flow-row gap-8 py-20 md:grid-flow-col">
      <NextLink href="/manger">
        <div className="inline-flex items-center px-4 py-3 text-xl font-medium text-white border border-transparent rounded-md shadow-sm cursor-pointer md:w-72 bg-manger-600 hover:bg-manger-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-manger-200">
          <div className="w-6 h-6 mr-4">
            <CuttingBoard />
          </div>
          Recettes à manger&nbsp;→
        </div>
      </NextLink>
      <div className="hidden w-8 h-8 -ml-1 text-brand-600 md:inline">
        <CookBook />
      </div>
      <NextLink href="/boire">
        <div className="inline-flex items-center px-6 py-3 text-xl font-medium text-white border border-transparent rounded-md shadow-sm cursor-pointer md:w-72 bg-boire-600 hover:bg-boire-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-boire-200">
          <div className="w-6 h-6 mr-4">
            <Lemonade />
          </div>
          Recettes à boire&nbsp;→
        </div>
      </NextLink>
    </section>
  );
}

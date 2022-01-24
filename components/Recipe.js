import unified from "unified";
import parse from "remark-parse";
import remark2react from "remark-react";

import romanNumeral from "../lib/romanNumeral";

import Image from "next/image";

import CookBook from "../elements/iconset/CookBook";
import CuttingBoard from "../elements/iconset/CuttingBoard";
import Lemonade from "../elements/iconset/Lemonade";

const Recipe = (props) => {
  const publish = new Date(props.date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const friendlyDate = publish.toLocaleDateString("fr-CA", options);

  const content = unified()
    .use(parse)
    .use(remark2react)
    .processSync(props.content).result;

  const roman = romanNumeral(props.id);

  let proseColor;
  let textColor;
  let borderColor;
  if (props.category == "manger") {
    proseColor = "prose-manger";
    textColor = "text-manger-500";
    borderColor = "border-manger-500";
  } else if (props.category == "boire") {
    proseColor = "prose-boire";
    textColor = "text-boire-500";
    borderColor = "border-boire-500";
  } else {
    proseColor = "prose-brand";
    textColor = "text-brand-600";
    borderColor = "border-brand-600";
  }

  return (
    <>
      <div>
        <div className={`text-center text-3xl font-bold ${textColor}`}>
          — {roman} —
        </div>

        <h1 className="text-center text-5xl font-bold">{props.title}</h1>
        <div className="m-4">
          <Image
            src={props.coverImage}
            alt={props.title}
            width="960"
            height="540"
            layout="intrinsic"
          />
        </div>
        <div
          className={`grid grid-flow-col items-center justify-center gap-8 border-b-2 pb-4 text-base md:text-lg ${borderColor} border-opacity-60`}
        >
          <p className="text-right md:w-32">{friendlyDate}</p>
          <div className={`h-6 w-6 ${textColor} -ml-1`}>
            {(() => {
              if (props.category == "manger") return <CuttingBoard />;
              if (props.category == "boire") return <Lemonade />;
              else return <CookBook />;
            })()}
          </div>
          <p className="text-left md:w-32">{props.author.name}</p>
        </div>
      </div>
      <article className={`prose prose-xl py-12 ${proseColor}`}>
        {content}
      </article>
    </>
  );
};

export default Recipe;

// title={post.title}
// date={post.date}
// slug={post.slug}
// id={post.id}
// author={post.author}
// content={post.content}
// ogImage={post.ogImage}
// coverImage={post.coverImage}
// category="manger"/"boire"

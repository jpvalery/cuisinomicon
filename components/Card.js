import Image from "next/image";
import NextLink from "next/link";

import romanNumeral from "../lib/romanNumeral";

import CardBorder from "../elements/CardBorder";

const Card = (props) => {
  const publish = new Date(props.date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const friendlyDate = publish.toLocaleDateString("fr-CA", options);

  const roman = romanNumeral(props.id);

  return (
    <NextLink href={props.slug}>
      <div className="relative cursor-pointer rounded-xl bg-gradient-to-bl from-yellow-100 via-yellow-50 to-yellow-100 text-black opacity-90 ring-8 ring-gray-800 hover:opacity-100 h-[36rem]">
        <article className="relative top-0 z-10 px-4 py-8 grid grid-flow-row items-center gap-2">
          <div className="text-center">
            <span className="text-wl font-black">- {roman} -</span>
            <h1 className="text-xl font-bold">{props.title}</h1>
          </div>
          <div className="mx-auto py-3">
            <Image
              src={props.coverImage}
              alt={props.title}
              width={420}
              height={280}
              className="rounded-md aspect-video"
            />
          </div>
          <div className="mx-auto grid max-w-max grid-flow-col items-center justify-center gap-2 border-b-2 border-black border-opacity-60 pb-2 text-base">
            <p>{friendlyDate}</p>
            <p>⏾</p>
            <p>{props.author}</p>
          </div>
          <p className="h-48 p-4 text-center text-base italic">
            {props.excerpt}
          </p>
        </article>

        <CardBorder category={props.category} />
      </div>
    </NextLink>
  );
};

export default Card;

// key={props.slug}
// title={props.title}
// coverImage={props.coverImage}
// date={props.date}
// author={props.author}
// slug={props.slug}
// id={props.id}
// excerpt={props.excerpt}
// category={props.excerpt}

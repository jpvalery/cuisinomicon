import NextLink from "next/link";
import Image from "next/image";

import romanNumeral from "../lib/romanNumeral";

import CardBorder from "../elements/CardBorder"

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
      <div className="relative text-black cursor-pointer bg-gradient-to-bl from-yellow-100 via-yellow-50 to-yellow-100 ring-gray-800 ring-8 rounded-xl opacity-90 hover:opacity-100">
        <article className="relative z-10 grid items-center grid-flow-row gap-2 mx-4 my-8">
          <div className="text-center">
            <span className="font-black text-wl">- {roman} -</span>
            <h1 className="text-xl font-bold">{props.title}</h1>
          </div>
          <div className="mx-auto my-3">
            <Image
              src={props.coverImage}
              alt={props.title}
              width={420}
              height={280}
              layout="intrinsic"
              className="rounded-md"
            />
          </div>
          <div className="grid items-center justify-center grid-flow-col gap-2 pb-2 mx-auto text-base border-b-2 border-black border-opacity-60 max-w-max">
            <p>{friendlyDate}</p>
            <p>⏾</p>
            <p>{props.author}</p>
          </div>
          <p className="h-48 p-4 text-base italic text-center">
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

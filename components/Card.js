import NextLink from "next/link";
import Image from "next/image";

import romanNumeral from "../lib/romanNumeral";

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
      <div className="grid items-center grid-flow-row gap-2 px-4 py-8 text-black cursor-pointer ring-gray-800 ring-8 rounded-xl bg-yellow-50 bg-opacity-90">
        <div className="text-center">
          <span className="font-black text-wl">- {roman} -</span>
          <h1 className="text-xl font-bold">{props.title}</h1>
        </div>
        <div className="mx-auto">
          <Image
            src={props.coverImage}
            alt={props.title}
            width={360}
            height={240}
            layout="intrinsic"
            className="rounded-t-lg"
          />
        </div>
        <div
          className="grid items-center justify-center grid-flow-col gap-2 pb-2 mx-auto text-base border-b-2 border-black border-opacity-60 max-w-max"
        >
          <p>{friendlyDate}</p>
          <p>⏾</p>
          <p>{props.author}</p>
        </div>
        <p className="h-48 p-4 text-base italic text-center">{props.excerpt}</p>
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

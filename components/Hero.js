import NextLink from "next/link";
import Image from "next/image";

import romanNumeral from "../lib/romanNumeral";

const Hero = (props) => {
  const publish = new Date(props.date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const friendlyDate = publish.toLocaleDateString("fr-CA", options);

  const roman = romanNumeral(props.id);

  return (
    <div className="mb-6">
      <NextLink href={props.slug}>
        <div className="relative cursor-pointer max-w-max">
          <div className="relative flex">
            <Image
              src={props.coverImage}
              alt={props.title}
              width={960}
              height={640}
              layout="intrinsic"
              className="rounded-lg"
            />
          </div>

          <div className="absolute bottom-0 w-full h-full">
            <div className="z-50 grid items-center h-full p-6 rounded-lg from-overlayg1-600 to-overlayg2-600 bg-gradient-to-l bg-clip-border">
              <div className="grid w-5/12 grid-flow-row gap-6 mt-auto ml-auto">
                <div className="text-center">
                  <span className="text-sm font-black xs:text-lg">
                    — {roman} –{" "}
                  </span>
                  <h1 className="text-lg font-bold xs:text-2xl">
                    {props.title}
                  </h1>
                </div>
                <div className="items-center justify-center hidden grid-flow-col gap-2 pb-4 mx-auto text-base border-b-2 border-white border-opacity-60 xs:grid max-w-max">
                  <p>{friendlyDate}</p>
                  <p>⏾</p>
                  <p>{props.author}</p>
                </div>
                <p className="hidden mx-auto text-base italic text-center md:inline">
                  {props.excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </NextLink>
    </div>
  );
};

export default Hero;

// key={props.slug}
// title={props.title}
// coverImage={props.coverImage}
// date={props.date}
// author={props.author}
// slug={props.slug}
// id={props.id}
// excerpt={props.excerpt}

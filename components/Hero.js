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
    <section className="mb-6">
      <NextLink href={props.slug}>
        <div className="relative max-w-max cursor-pointer opacity-90 hover:opacity-100">
          <div className="relative flex">
            <Image
              src={props.coverImage}
              alt={props.title}
              width={960}
              height={640}
              className="rounded-lg"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>

          <div className="absolute bottom-0 h-full w-full">
            <div className="z-50 grid h-full items-center rounded-lg bg-linear-to-l from-overlayg1-600 to-overlayg2-600 bg-clip-border p-6">
              <div className="mt-auto ml-auto grid w-5/12 grid-flow-row gap-6">
                <div className="text-center">
                  <span className="text-sm font-black xs:text-lg">
                    — {roman} –{" "}
                  </span>
                  <h1 className="text-lg font-bold xs:text-2xl">
                    {props.title}
                  </h1>
                </div>
                <div className="mx-auto hidden max-w-max grid-flow-col items-center justify-center gap-2 border-b-2 border-white border-opacity-60 pb-4 text-base xs:grid">
                  <p>{friendlyDate}</p>
                  <p>⏾</p>
                  <p>{props.author}</p>
                </div>
                <p className="mx-auto hidden text-center text-base italic md:inline">
                  {props.excerpt}
                </p>
              </div>
            </div>
          </div>
        </div>
      </NextLink>
    </section>
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

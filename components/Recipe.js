import parse from "remark-parse";
import remark2react from "remark-react";
import unified from "unified";

import romanNumeral from "../lib/romanNumeral";

import Image from "next/image";

import { RecipeJsonLd } from "next-seo";
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

  const recipeJson = props?.recipeJson;
  const ingredients = recipeJson?.ingredients;
  const instructions = recipeJson?.instructions;

  return (
    <>
      <RecipeJsonLd
        name={props.title}
        description={props.excerpt}
        datePublished={props.date}
        authorName={props.author.name}
        prepTime={recipeJson?.prepTime}
        cookTime={recipeJson?.cookTime}
        totalTime={recipeJson?.totalTime}
        keywords={recipeJson?.keywords}
        yields={recipeJson?.yields}
        category={recipeJson?.category}
        cuisine={recipeJson?.cuisine}
        calories={recipeJson?.calories}
        images={recipeJson?.images}
        ingredients={ingredients}
        instructions={instructions}
      />
      <div>
        <div className={`text-center text-3xl font-bold ${textColor}`}>
          — {roman} —
        </div>

        <h1 className="text-center text-5xl font-bold">{props.title}</h1>
        <div className="m-4 w-full aspect-video relative">
          <Image src={props.coverImage} alt={props.title} fill />
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

      <div className="mx-auto max-w-fit">
        <div className="grid grid-cols-1 gap-px sm:grid-cols-3 items-start justify-center">
          <div className="p-6">
            <p className="text-base font-medium leading-6 text-gray-200">
              Préparation
            </p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-3xl font-semibold tracking-tight text-white">
                {recipeJson.prepTime.replace("PT", "").slice(0, -1)}
              </span>
              <span className="text-xs text-gray-400">
                {recipeJson.prepTime.charAt(recipeJson.prepTime.length - 1) ==
                "H"
                  ? "heure"
                  : recipeJson.prepTime.charAt(
                      recipeJson.prepTime.length - 1,
                    ) == "M"
                  ? "minute"
                  : ""}
                {parseInt(
                  recipeJson.prepTime.charAt(recipeJson.prepTime.length - 2),
                ) > 1
                  ? "s"
                  : ""}
              </span>
            </p>
          </div>

          <div className="p-6">
            <p className="text-base font-medium leading-6 text-gray-200">
              Cuisson
            </p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-3xl font-semibold tracking-tight text-white">
                {recipeJson.cookTime.replace("PT", "").slice(0, -1)}
              </span>
              <span className="text-xs text-gray-400">
                {recipeJson.cookTime.charAt(recipeJson.cookTime.length - 1) ==
                "H"
                  ? "heure"
                  : recipeJson.cookTime.charAt(
                      recipeJson.cookTime.length - 1,
                    ) == "M"
                  ? "minute"
                  : ""}
                {parseInt(
                  recipeJson.cookTime.charAt(recipeJson.cookTime.length - 2),
                ) > 1
                  ? "s"
                  : ""}
              </span>
            </p>
          </div>

          <div className="p-6">
            <p className="text-base font-medium leading-6 text-gray-200">
              Total
            </p>
            <p className="mt-2 flex items-baseline gap-x-2">
              <span className="text-3xl font-semibold tracking-tight text-white">
                {recipeJson.totalTime.replace("PT", "").slice(0, -1)}
              </span>
              <span className="text-xs text-gray-400">
                {recipeJson.totalTime.charAt(recipeJson.totalTime.length - 1) ==
                "H"
                  ? "heure"
                  : recipeJson.totalTime.charAt(
                      recipeJson.totalTime.length - 1,
                    ) == "M"
                  ? "minute"
                  : ""}
                {parseInt(
                  recipeJson.totalTime.charAt(recipeJson.totalTime.length - 2),
                ) > 1
                  ? "s"
                  : ""}
              </span>
            </p>
          </div>
        </div>
      </div>
      <article
        className={`prose prose-xl prose-li:m-0 prose-img:m-0 py-12 ${proseColor}`}
      >
        {content}
        <h2>Ingrédients</h2>
        <ul className="grid grid-flow-row gap-0">
          {ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))}
        </ul>
        <h2>Instructions</h2>
        <div className="grid grid-flow-row gap-x-8 gap-y-12 pl-4">
          {instructions.map((instruction, index) => (
            <div
              key={instruction.name}
              className="grid grid-flow-col gap-2 items-center justify-between"
            >
              <div>
                <h3 className="m-0">
                  {index + 1}. {instruction.name}
                </h3>
                <p>{instruction.text}</p>
              </div>
              <div className="relative w-32 h-32">
                {instruction?.image ? (
                  <Image
                    src={instruction.image}
                    alt={instruction.text}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
            </div>
          ))}
        </div>
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

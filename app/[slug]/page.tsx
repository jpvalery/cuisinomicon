import { getRecipeBySlug } from "@/lib/recipes";
import { RecipeJsonLd } from "next-seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface RecipePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: RecipePageProps) {
  const { slug } = await params; // ✅ await params
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    return { title: "Recipe Not Found" };
  }

  return {
    title: `${recipe.title} | Recipe Collection`,
    description: recipe.excerpt,
    openGraph: {
      title: recipe.title,
      description: recipe.excerpt,
      images: [
        {
          url: recipe.ogImage.url,
          width: 1200,
          height: 630,
          alt: recipe.title,
        },
      ],
    },
  };
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { slug } = await params; // ✅ await params
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const formatTime = (time: string) => {
    const match = time.match(/PT(\d+H)?(\d+M)?/);
    if (!match) return time;

    const hours = match[1] ? Number.parseInt(match[1]) : 0;
    const minutes = match[2] ? Number.parseInt(match[2]) : 0;

    if (hours && minutes) return `${hours}h ${minutes}m`;
    if (hours) return `${hours}h`;
    if (minutes) return `${minutes}m`;
    return time;
  };

  return (
    <>
      <RecipeJsonLd
        useAppDir={true}
        name={recipe.title}
        description={recipe.excerpt}
        authorName={recipe.author.name}
        ingredients={recipe.RecipeJson.ingredients}
        instructions={recipe.RecipeJson.instructions.map((step) => ({
          name: step.name,
          text: step.text,
          image: step.image || undefined,
        }))}
        images={recipe.RecipeJson.images}
        prepTime={recipe.RecipeJson.prepTime}
        cookTime={recipe.RecipeJson.cookTime}
        totalTime={recipe.RecipeJson.totalTime}
        keywords={recipe.RecipeJson.keywords}
        yields={recipe.RecipeJson.yields}
        category={recipe.RecipeJson.category}
        cuisine={recipe.RecipeJson.cuisine}
      />

      <main className="min-h-screen">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Link
            href="/"
            className="inline-flex items-center text-stone-600 hover:text-stone-950 mb-8 transition-colors"
          >
            ← Retour
          </Link>

          <article className="recipe-content">
            <header className="mb-8">
              {recipe.coverImage && (
                <div className="relative mb-8">
                  <Image
                    src={recipe.coverImage || "/placeholder.svg"}
                    alt={recipe.title}
                    width={800}
                    height={600}
                    className="w-full rounded-lg shadow-lg"
                  />

                  <div className="absolute inset-0 flex items-center justify-end">
                    <div className="text-stone-950 text-right p-6 rounded-lg max-w-[50%] grid grid-flow-row gap-4">
                      <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        {recipe.title}
                      </h1>
                      <p className="text-lg text-balance">{recipe.excerpt}</p>
                      <div className="flex flex-wrap justify-end gap-6 text-sm text-stone-600 mb-6">
                        <span>{recipe.author.name}</span>
                        <span>•</span>
                        <span>{recipe.RecipeJson.category}</span>
                        <span>•</span>
                        <span>{recipe.RecipeJson.cuisine}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-stone-200 rounded-lg">
                <div className="text-center">
                  <div className="font-bold text-stone-950">Préparation</div>
                  <div className="text-stone-700">
                    {formatTime(recipe.RecipeJson.prepTime)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-stone-950">Cuisson</div>
                  <div className="text-stone-700">
                    {formatTime(recipe.RecipeJson.cookTime)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-stone-950">Total</div>
                  <div className="text-stone-700">
                    {formatTime(recipe.RecipeJson.totalTime)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-stone-950">Portions</div>
                  <div className="text-stone-700">
                    {recipe.RecipeJson.yields}
                  </div>
                </div>
              </div>
            </header>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold mb-4">Ingrédients</h2>
                <ul className="space-y-2">
                  {recipe.RecipeJson.ingredients.map((ingredient, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <li key={index} className="flex items-start">
                      <span className="text-stone-500 mr-2">•</span>
                      <span>{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">Instructions</h2>
                <div className="space-y-6">
                  {recipe.RecipeJson.instructions.map((step, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                    <div key={index} className="recipe-step">
                      <h3 className="font-bold text-lg mb-2">
                        {index + 1}. {step.name}
                      </h3>
                      <p className="text-stone-700 mb-3">{step.text}</p>
                      {step.image && (
                        <Image
                          src={step.image || "/placeholder.svg"}
                          alt={`Step ${index + 1}: ${step.name}`}
                          width={400}
                          height={300}
                          className="rounded-lg shadow-md"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-stone-200 rounded-lg">
              {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
              <div dangerouslySetInnerHTML={{ __html: recipe.content }} />
            </div>
          </article>
        </div>
      </main>
    </>
  );
}

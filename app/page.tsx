import RecipeGrid from "@/components/RecipeGrid";
import { getAllRecipes } from "@/lib/recipes";

export default async function HomePage() {
  const recipes = await getAllRecipes();

  return (
    <main className="min-h-screen">
      <header className="text-center py-12 px-6">
        <h1 className="text-4xl md:text-6xl font-bold italic text-stone-950 mb-2">
          Cuisinomicon
        </h1>
        <p className="text-lg md:text-xl text-stone-700 max-w-2xl mx-auto">
          Collection de recettes de Jp
        </p>
      </header>

      <RecipeGrid recipes={recipes} />
    </main>
  );
}

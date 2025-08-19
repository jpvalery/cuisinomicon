import type { Recipe } from "@/lib/recipes";
import romanNumeral from "@/lib/romanNumeral";
import Image from "next/image";
import Link from "next/link";

interface RecipeGridProps {
  recipes: Recipe[];
}

export default function RecipeGrid({ recipes }: RecipeGridProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {recipes.map((recipe, index) => (
          <Link key={recipe.slug} href={`/${recipe.slug}`}>
            <div className="relative cursor-pointer opacity-90 hover:opacity-100 transition-opacity duration-300 group">
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <Image
                  src={recipe.coverImage || "/placeholder.svg"}
                  alt={recipe.title}
                  width={1280}
                  height={720}
                  className="aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 flex justify-end items-center p-4">
                  <div className="w-[60%] text-stone-950">
                    <div className="text-right">
                      <span className="text-sm font-bold">
                        —&nbsp;&nbsp;{romanNumeral(index + 1)}&nbsp;&nbsp;—
                      </span>
                      <h2 className="text-3xl font-bold">{recipe.title}</h2>
                    </div>

                    <div className="flex items-center justify-end gap-2 text-sm">
                      <span>{formatDate(recipe.date)}</span>
                      <span>•</span>
                      <span>{recipe.RecipeJson.category}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

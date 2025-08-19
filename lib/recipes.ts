import matter from "gray-matter";
import fs from "node:fs";
import path from "node:path";

export interface Recipe {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  id: number;
  author: {
    name: string;
  };
  ogImage: {
    url: string;
  };
  RecipeJson: {
    prepTime: string;
    cookTime: string;
    totalTime: string;
    keywords: string;
    yields: string;
    category: string;
    cuisine: string;
    images: string[];
    ingredients: string[];
    instructions: Array<{
      name: string;
      text: string;
      image: string;
    }>;
  };
  content: string;
}

const recipesDirectory = path.join(process.cwd(), "content");

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const fileNames = fs.readdirSync(recipesDirectory);
    const recipes = (
      await Promise.all(
        fileNames
          .filter((name) => name.endsWith(".md"))
          .map((name) => {
            const slug = name.replace(/\.md$/, "");
            return getRecipeBySlug(slug); // returns Promise<Recipe | null>
          }),
      )
    ).filter((recipe): recipe is Recipe => recipe !== null);

    return recipes.sort((a, b) => (a.date < b.date ? -1 : 1));
  } catch (error) {
    console.warn("Content directory not found, returning empty recipes array");
    return [];
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    const fullPath = path.join(recipesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      date: data.date,
      id: data.id,
      author: data.author,
      ogImage: data.ogImage,
      RecipeJson: data.RecipeJson,
      content,
    };
  } catch (error) {
    return null;
  }
}

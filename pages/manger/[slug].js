import { NextSeo } from "next-seo";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import { getAllPosts, getPostBySlug } from "../../lib/apiM";

import Recipe from "../../components/Recipe";
import RecipeSkeleton from "../../components/RecipeSkeleton";

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <NextSeo
        title={post.title}
        description={post.excerpt}
        openGraph={{
          images: [{ url: `https://cuisinomicon.com${post.ogImage.url}` }],
        }}
      />
      <main>
        {router.isFallback ? (
          <RecipeSkeleton />
        ) : (
          <Recipe
            title={post.title}
            date={post.date}
            slug={post.slug}
            id={post.id}
            author={post.author}
            content={post.content}
            ogImage={post.ogImage}
            coverImage={post.coverImage}
            recipeJson={post.RecipeJson}
            category="manger"
          />
        )}
      </main>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "excerpt",
    "id",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "content",
    "RecipeJson",
  ]);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}

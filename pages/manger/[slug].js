import { useRouter } from "next/router";
import ErrorPage from "next/error";

import { getPostBySlug, getAllPosts } from "../../lib/apiM";

import Recipe from "../../components/Recipe";
import RecipeSkeleton from "../../components/RecipeSkeleton";

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
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
          category="manger"
        />
      )}
    </main>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "id",
    "author",
    "content",
    "ogImage",
    "coverImage",
    "content",
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

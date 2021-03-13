import React from "react";

import { getAllPosts } from "../../lib/apiB";

import Card from "../../components/Card";
import Hero from "../../components/Hero";

export default function Index({ allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <Hero
        key={heroPost.slug}
        title={heroPost.title}
        coverImage={heroPost.coverImage}
        date={heroPost.date}
        author={heroPost.author.name}
        slug={`/boire/${heroPost.slug}`}
        id={heroPost.id}
        excerpt={heroPost.excerpt}
      />

      <div className="grid grid-cols-1 gap-6 mb-32 xs:grid-cols-2">
        {morePosts.map((post) => (
          <Card
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author.name}
            id={post.id}
            slug={`/boire/${post.slug}`}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const allPosts = getAllPosts([
    "title",
    "date",
    "slug",
    "id",
    "author",
    "coverImage",
    "excerpt",
  ]);

  return {
    props: { allPosts },
  };
}

import React from "react";
import { NextSeo } from "next-seo";

import { getAllPosts } from "../../lib/apiM";

import Card from "../../components/Card";
import Hero from "../../components/Hero";
import SectionTitle from "../../components/SectionTitle";

export default function Index({ allPosts }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <NextSeo
        title="Recettes à manger"
        description="Parcourir les recettes de plats à manger du Cuisinomicon"
      />
      <section className="grid grid-flow-row gap-8">
        <SectionTitle title="Dernière recette" colorFamily="manger" />

        <Hero
          key={heroPost.slug}
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author.name}
          slug={`/manger/${heroPost.slug}`}
          id={heroPost.id}
          excerpt={heroPost.excerpt}
        />
      </section>

      <section className="grid grid-flow-row gap-8 mt-10">
        <SectionTitle
          title="Toutes les recettes de plats"
          colorFamily="manger"
        />

        <div className="grid grid-cols-1 gap-6 mb-32 sm:grid-cols-2">
          {morePosts.map((post) => (
            <Card
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              author={post.author.name}
              id={post.id}
              slug={`/manger/${post.slug}`}
              excerpt={post.excerpt}
            />
          ))}
        </div>
      </section>
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

import { getAllPosts as getAllPostsB } from "../lib/apiB";
import { getAllPosts as getAllPostsM } from "../lib/apiM";

import { NextSeo } from "next-seo";

import Hero from "../components/Hero";
import ButtonsCategory from "../components/ButtonsCategory";
import Logo from "../elements/icons/Cuisinomicon";

export default function Home({ allPosts }) {
  return (
    <>
      <NextSeo
        title="Cuisinomicon 𖤐"
        titleTemplate="Cuisinomicon 𖤐"
        description="Recettes de cuisine et de cocktails cabalistiques"
      />
      <main>
        <section>
          <div className="max-w-2xl pb-6 mx-auto animate-pulse-slow text-brand-600">
            <Logo />
            <h1 className="sr-only">Cuisinomicon</h1>
          </div>
          <p className="text-4xl font-bold text-center">
            Recettes de cuisine cabalistiques
          </p>
        </section>

        <ButtonsCategory />

        <Hero
          key={allPosts.latestB.slug}
          title={allPosts.latestB.title}
          coverImage={allPosts.latestB.coverImage}
          date={allPosts.latestB.date}
          author={allPosts.latestB.author.name}
          id={allPosts.latestB.id}
          slug={`/boire/${allPosts.latestB.slug}`}
          excerpt={allPosts.latestB.excerpt}
        />

        <Hero
          key={allPosts.latestM.slug}
          title={allPosts.latestM.title}
          coverImage={allPosts.latestM.coverImage}
          date={allPosts.latestM.date}
          author={allPosts.latestB.author.name}
          id={allPosts.latestM.id}
          slug={`/manger/${allPosts.latestM.slug}`}
          excerpt={allPosts.latestM.excerpt}
        />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const allPostsB = getAllPostsB([
    "title",
    "date",
    "slug",
    "id",
    "author",
    "coverImage",
    "excerpt",
  ]);

  const latestB = allPostsB[0];

  const allPostsM = getAllPostsM([
    "title",
    "date",
    "slug",
    "id",
    "author",
    "coverImage",
    "excerpt",
  ]);

  const latestM = allPostsM[0];

  const allPosts = { latestB, latestM };

  return {
    props: { allPosts },
  };
}

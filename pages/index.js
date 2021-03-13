import Logo from "../elements/icons/Cuisinomicon";

export default function Home() {
  return (
    <div>
      <main>
        <div className="max-w-2xl p-12 mx-auto animate-pulse-slow">
          <Logo />
          <h1 className="sr-only">Cuisinomicon</h1>
        </div>
        <p className="text-3xl font-medium text-center">
          Recettes de cuisine et de cocktails cabalistiques
        </p>
      </main>
    </div>
  );
}

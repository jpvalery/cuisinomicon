import Logo from "../elements/icons/Cuisinomicon";

export default function Home() {
  return (
    <div>
      <main>
        <div className="max-w-2xl p-12 mx-auto animate-pulse-slow text-brand-600">
          <Logo />
          <h1 className="sr-only">Cuisinomicon</h1>
        </div>
        <p className="text-4xl font-bold text-center">
          Recettes de cuisine cabalistiques
        </p>
      </main>
    </div>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-stone-800 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="border-t border-stone-500 pt-6">
          <p className="text-sm">
            © 2021-{new Date().getFullYear()} Cuisinomicon par{" "}
            <Link href="https://jpvalery.me" className="hover:underline">
              Jp Valery
            </Link>
            . Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}

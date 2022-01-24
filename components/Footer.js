import Twitter from "../elements/icons/Twitter";

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto mt-6 max-w-4xl border-t-2 border-yellow-700 border-opacity-80 p-6 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="https://twitter.com/jpvalery"
            className="h-6 w-6 text-gray-500 hover:text-gray-400"
          >
            <span className="sr-only">Twitter</span>
            <Twitter />
          </a>
        </div>
        <div className="mt-4 md:order-1 md:mt-0">
          <p className="text-center text-sm text-gray-500 md:text-base">
            &copy; 2021-2022 Cuisinomicon by{" "}
            <a
              href="https://jpvalery.me"
              className="hover:text-gray-400"
              target="_blank"
            >
              Jp Valery
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

import Twitter from "../elements/icons/Twitter";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-4xl p-6 mx-auto mt-6 border-t-2 border-yellow-700 md:flex md:items-center md:justify-between border-opacity-80">
        <div className="flex justify-center space-x-6 md:order-2">
          <a
            href="https://twitter.com/jpvalery"
            className="w-6 h-6 text-gray-500 hover:text-gray-400"
          >
            <span className="sr-only">Twitter</span>
            <Twitter />
          </a>
        </div>
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-base text-center text-gray-500">
            &copy; 1992-2021 <a href="https://jpvalery.me" className="hover:text-gray-400" target="_blank">Jp Valery</a>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

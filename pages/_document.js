import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            defer
            data-website-id="2025ac19-430a-4360-b22d-12870aa0c4b5"
            src="https://analytics.jpvalery.com/umami.js"
          ></script>
        </Head>
        <body className="font-serif text-xl text-white bg-eigengrau-600">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

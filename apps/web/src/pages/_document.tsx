import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html className="scroll-smooth">
        <Head>
          <link
            crossOrigin="anonymous"
            href="https://fonts.googleapis.com/css2?family=Oswald&display=optional"
            rel="stylesheet"
          />
        </Head>
        <body className="bg-white dark:bg-black relative">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

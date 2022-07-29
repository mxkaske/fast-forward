import "../styles/globals.css";
// import "../styles/widget.css"; // no need with tailwind v3.1+
import "@fdbk/widget-react/dist/build.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

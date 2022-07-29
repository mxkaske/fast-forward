import "@fdbk/widget-react/dist/build.css"; // REMINDER: has to be before the globals from tailwindcss
import "../styles/globals.css";
import "../styles/prism.css";
import "../styles/nprogress.css";
import { MDXProvider } from "@mdx-js/react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { NextComponentType, NextPageContext } from "next";
import Auth, { AuthComponentProps } from "@/components/auth/Auth";
import { DefaultSeo } from "next-seo";
import SEO from "@/config/next-seo.config";
import { SessionProvider } from "next-auth/react";
import Router from "next/router";
import NProgress from "nprogress";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });

const components = {
  // img: Image,
  // h1: Heading.H1,
  // h2: Heading.H2,
  // ...
};

export type NextComponentWithAuth = NextComponentType<
  NextPageContext,
  any,
  {}
> &
  Partial<AuthComponentProps>;

type CustomAppProps = Omit<AppProps, "Component"> & {
  Component: NextComponentWithAuth;
};

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <MDXProvider components={components}>
          <DefaultSeo {...SEO} />
          {Component.auth ? (
            <Auth auth={Component.auth}>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
          <Toaster position="top-right" />
        </MDXProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
export default MyApp;

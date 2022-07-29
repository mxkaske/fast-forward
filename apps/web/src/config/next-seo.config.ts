import { DefaultSeoProps } from "next-seo";

const SEO: DefaultSeoProps = {
  defaultTitle: "Fast Forward",
  openGraph: {
    title: "Fast Forward - The easiest way to collect feedback.",
    description:
      "You want to collect feedback fast, reliable and without any big setup? Welcome to Fast Forward.",
    url: "https://fast-forward.app/",
    site_name: "Fast Forward",
    images: [
      {
        url: "https://fast-forward.app/meta/default.png",
        width: 600,
        height: 312,
        alt: "Fast Forward - The easiest way to collect feedback.",
      },
    ],
  },
  twitter: {
    handle: "@mxkaske",
    cardType: "summary_large_image",
  },
  additionalLinkTags: [
    // <link rel="icon" href="/favicon.ico" />
    {
      rel: "icon",
      href: "/favicon.ico",
    },
  ],
};

export default SEO;

const withTM = require("next-transpile-modules");
const withPlugins = require("next-compose-plugins");
const cl = require("next-contentlayer");

const withMDX = require("@next/mdx")({
  extension: /\.mdx$/,
});

const mdxConfig = { pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"] };

const config = {
  reactStrictMode: true,
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
      "localhost",
    ],
  },
  async headers() {
    return [
      {
        // allow CORS on api/feedback
        source: "/api/feedback",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = withPlugins(
  [withTM(["@fdbk/widget-react"]), cl.withContentlayer({}), withMDX(mdxConfig)],
  config
);

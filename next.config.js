/* eslint-env node */
const { resolve } = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
const mdxSiteOptions = require("./.build/server/mdx-config-site");
const mdxDocsOptions = require("./.build/server/mdx-config-docs");
const {
  getRedirects,
  getLatestVersionRewirites,
  generateSitemap,
  generateFullSitemap,
} = require("./.build/server/paths");

const PAGES_DIRECTORY = resolve(__dirname, "pages");
const CONTENT_DIRECTORY = resolve(__dirname, "content");
const COMPANY_LOGOS_DIRECTORY = resolve(__dirname, "components/Company");

module.exports = withBundleAnalyzer({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  rewrites: async () => getLatestVersionRewirites(),
  redirects: async () => getRedirects(),
  images: {
    path: "/_next/image/",
    disableStaticImages: true,
    domains: ["i.ytimg.com"],
  },
  trailingSlash: true,
  webpack: (config, options) => {
    if (!options.dev) {
      generateSitemap();
      generateFullSitemap();
    }
    config.output.assetModuleFilename = "static/images/[hash][ext]";

    config.module.rules.push({
      test: /\.svg$/,
      exclude: [/node_modules/, COMPANY_LOGOS_DIRECTORY],
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            jsx: {
              babelConfig: {
                plugins: [
                  [
                    "@svgr/babel-plugin-remove-jsx-attribute",
                    {
                      elements: ["svg", "g", "path", "rect"],
                      attributes: ["xmlns:lucid", "lucid:page-tab-id"],
                    },
                  ],
                ],
              },
            },
          },
        },
        {
          loader: "file-loader",
          options: {
            publicPath: `/_next/static/images/`,
            outputPath: "static/images/",
            name: "[hash].[ext]",
          },
        },
      ],
    });
    config.module.rules.push({
      test: /\.(png|jpg|webp|gif|mp4|webm|ogg|swf|ogv)$/i,
      type: "asset/resource",
      exclude: /node_modules/,
    });
    config.module.rules.push({
      test: /\.svg$/,
      include: COMPANY_LOGOS_DIRECTORY,
      type: "asset/resource",
    });
    config.module.rules.push({
      test: /\.(md|mdx)$/,
      include: CONTENT_DIRECTORY,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: mdxDocsOptions.default,
        },
      ],
    });
    config.module.rules.push({
      test: /\.(md|mdx)$/,
      include: PAGES_DIRECTORY,
      exclude: CONTENT_DIRECTORY,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: mdxSiteOptions.default,
        },
      ],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: "json",
      use: "yaml-loader",
    });

    return config;
  },
});

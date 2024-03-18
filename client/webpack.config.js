const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
       // Plugin to generate HTML file with the webpack bundles injected
      new HtmlWebpackPlugin({
        title: "Jate",
        template: "./src/index.html",
        chunks: ["main"],
      }),
      // Plugin to inject a service worker into the webpack build
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "sw.js",
      }),
      // Plugin to generate a web app manifest for the PWA
      new WebpackPwaManifest({
        name: "Just Another Text Editor",
        short_name: "JATE",
        description: "A simple text editor for the web",
        background_color: "#ffffff",
        theme_color: "#000000",
        start_url: "/",
        publicPath: "/",
        fingerprints: false,
        inject: true,
        icons: [
          {
            src: path.resolve("src/assets/icon.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ], // closing bracket for the icons array
      }), // closing bracket for the WebpackPwaManifest constructor
    ],

    module: {
      rules: [
        // Rule to handle CSS files
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        // Rule to transpile JavaScript files using Babel
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-class-properties",
              ],
            },
          },
        },
      ],
    },
  };
};

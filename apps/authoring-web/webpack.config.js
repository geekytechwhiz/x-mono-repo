const { composePlugins, withNx } = require("@nx/webpack");
const { withReact } = require("@nx/react");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  withReact({
    // Uncomment this line if you don't want to use SVGR
    // See: https://react-svgr.com/
    // svgr: false
  }),

  (config) => {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        path: require.resolve("path-browserify"),
      },
    };
    // Update the webpack config as needed here.
    // e.g. `config.plugins.push(new MyPlugin())`
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        filename: "./src/index.html",
        favicon: "./src/favicon.ico",
      }),
    );
    return config;
  },
);

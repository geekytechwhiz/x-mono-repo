//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nx/next');
// next.config.js
// const withNx = require('@nrwl/next/plugins/with-nx');
// const path = require('path');

module.exports = withNx({
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  compiler: {
    // For other options, see https://styled-components.com/docs/tooling#babel-plugin
    styledComponents: true,
  },
  webpack: (config, { isServer }) => {
    // Added a loader for font files
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'static/fonts/',
          publicPath: '/_next/static/fonts/',
        },
      },
    });

    return config;
  },
});

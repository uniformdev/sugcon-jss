const path = require('path');
const env = require('@babel/preset-env');
const reactApp = require('babel-preset-react-app');
const reactScriptsEnv = require('react-scripts/config/env');
const webpack = require('webpack');
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');
const LoadableBabelPlugin = require('@loadable/babel-plugin');

// Webpack build configuration to build the SSR bundle.
// Invoked by build:server.

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, './server.tsx'),
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '../build/server.bundle.js',
    libraryTarget: 'this',
    // This filename pattern _must_ match the `chunkFilename` pattern declared
    // in create react app webpack config. At least the `[name]` and `.chunk.js` portion.
    // The `[contenthash:8]` part is optional because the hash will almost never
    // match between client and server chunks because the code in each chunk is
    // transpiled differently (cjs vs esm).
    chunkFilename: './server/[name].[contenthash:8].chunk.js',
  },
  node: {
    // tells webpack to use regular Node __dirname behavior
    __dirname: false,
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        exclude: [/node_modules/, /@altola/],
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [env, reactApp],
            plugins: [LoadableBabelPlugin],
          },
        },
      },
      {
        test: /\.svg$/,
        include: /@altola/,
        use: ['@svgr/webpack?-svgo,+ref![path]', 'url-loader'],
      },
      {
        test: /\.m?jsx?$/,
        exclude: [/node_modules/, /@altola/],
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [env, reactApp],
          },
        },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' },
      },
      {
        // Anything in our app that does not have one of the extensions listed below,
        // we load as a URL, this makes static image imports work with SSR.
        // NOTE: we include `svg` in this list because svg images are handled by a
        // separate loader (see svg loader config above). Webpack is happy to apply
        // multiple loaders to a file, so if we let `url-loader` handle svg here,
        // it will essentially double-encode svg output from the svg loader.
        test: /\.(?!js|svg|mjs|jsx|ts|tsx|html|graphql$)[^.]+$/,
        exclude: [/node_modules/, /@altola/],
        use: {
          loader: 'url-loader',
        },
      },
      {
        // Anything in a path matching any of the patterns in the `include` property
        // that doesn't have one of the extensions listed in the `test` property,
        // we load as null and assume it is not needed for SSR - e.g. imported css from a module.
        test: /\.(?!js|svg|mjs|jsx|ts|tsx|html|graphql$)[^.]+$/,
        // we explicitly add `@altola` as a pattern here for devs using something like `yalc`,
        // where the resolved path might be a symlink to a folder outside of `node_modules`.
        include: [/node_modules/, /@altola/],
        use: {
          loader: 'null-loader',
        },
      },
    ],
  },
  plugins: [
    // use the same DefinePlugin configuration builder that is used by react-scripts
    new webpack.DefinePlugin(reactScriptsEnv(process.env.PUBLIC_URL).stringified),
    // the filename specified here is referenced within the `server/server.tsx` entrypoint
    new LoadableWebpackPlugin({ filename: 'loadable-stats-server.json' }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};

const jssConfig = require('./scjssconfig.json');
const { addAfterLoader, loaderByName } = require('@craco/craco');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LoadableWebpackPlugin = require('@loadable/webpack-plugin');

// NOTE: preload-webpack-plugin version '3.0.0-beta.4' is required in order
// to use with HtmlWebpackPlugin v4.x (beta), which is the version of HtmlWebpackPlugin
// that react-scripts (CRA) uses. If CRA changes their HtmlWebpackPlugin version dependency,
// be sure that preload-webpack-plugin is changed accordingly.
const PreloadWebpackPlugin = require('preload-webpack-plugin');

// NOTE: this config file only affects the `client` build. Any server
// config changes should be made in the `server/server.webpack.config.js` file.

module.exports = {
  webpack: {
    configure: (webpackConfig, { env: webpackEnv, paths }) => {
      addAfterLoader(webpackConfig, loaderByName('file-loader'), {
        test: /\.(html)$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
        },
      });

      // Because ui-app is using inline svg via @svgr/webpack and react-scripts does not apply it for node_modules
      // we have manually add such loader.
      addAfterLoader(webpackConfig, loaderByName('babel-loader'), {
        test: /\.svg$/,
        include: /@altola/,
        use: ['@svgr/webpack?-svgo,+ref![path]', 'url-loader'],
      });

      // allow devs to disable minification by using a custom `BUILD_ENV` var
      if (process.env.BUILD_ENV === 'development') {
        webpackConfig.optimization.minimize = false;
        webpackConfig.optimization.minimizer = [];
      }

      if (process.env.BUNDLE_ANALYZE === 'true') {
        webpackConfig.plugins.push(new BundleAnalyzerPlugin());
      }

      if (process.env.PROFILING_ENABLED === 'true') {
        webpackConfig.resolve.alias = {
          ...webpackConfig.resolve.alias,
          'react-dom$': 'react-dom/profiling',
          'scheduler/tracing': 'scheduler/tracing-profiling',
        };
      }

      // The filename specified here is referenced within the `server/server.tsx` entrypoint.
      // The server entry needs to ready from the stats file.
      webpackConfig.plugins.push(new LoadableWebpackPlugin({ filename: 'loadable-stats-client.json' }));

      // Add `<link rel="preload" as="script" src="my-script.js" />` tags to the generated HTML output.
      // These tags will be placed at the end of the `<head />` tag, but be aware that the server
      // entrypoint may add tags after these generated `<link />` tags.
      webpackConfig.plugins.push(
        new PreloadWebpackPlugin({
          rel: 'preload',
          // `initial` will include the "main" and "vendor" chunks emitted by react-scripts webpack.
          include: 'initial',
          // We want to exclude source maps, css files, and the `runtime-main.xxxx.js` files from
          // being emitted as `rel="preload"` links.
          fileBlacklist: [/\.map/, /\.css/, /.*runtime-main.*/],
        })
      );

      return webpackConfig;
    },
  },
  devServer: {
    // when in connected mode we want to proxy Sitecore paths
    // off to Sitecore
    proxy: {
      '/sitecore': jssConfig.layoutServiceHost,
      '/-': jssConfig.layoutServiceHost,
      '/layouts': jssConfig.layoutServiceHost,
    },
  },
};

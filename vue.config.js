const PurgeCssPlugin = require('purgecss-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const glob = require('glob-all');
const path = require('path');
const webpack = require('webpack');

const productionGzipExtensions = ['js', 'css'];

// Custom PurgeCSS extractor for Tailwind that allows special characters in
// class names.
//
// https://github.com/FullHuman/purgecss#extractor
class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
  }
}

module.exports = {
  configureWebpack: {
    // Merged into the final Webpack config
    plugins: [
      new PurgeCssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/index.html'),
          path.join(__dirname, './**/*.vue'),
          path.join(__dirname, './src/**/*.js'),
        ]),
        extractors: [
          {
            extractor: TailwindExtractor,
            extensions: ['html', 'js', 'vue'],
          },
        ],
        whitelist: ['html'],
      }),
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
      }),
      new webpack.EnvironmentPlugin({
        BUILD_TIME: new Date(),
      }),
    ],
    resolve: {
      alias: {
        'chart.js': 'chart.js/dist/Chart.min.js',
        // moment is never used so import dummy.js instead
        moment: path.join(__dirname, 'dummy.js'),
      },
    },
  },
};

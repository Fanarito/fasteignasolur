const purgeCssPlugin = require('purgecss-webpack-plugin');
const glob = require('glob-all');
const path = require('path');

module.exports = {
  configureWebpack: {
    // Merged into the final Webpack config
    plugins: [
      new purgeCssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/index.html'),
          path.join(__dirname, './**/*.vue'),
          path.join(__dirname, './src/**/*.js'),
        ]),
      }),
    ],
  },
};

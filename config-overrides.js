const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [{ from: path.resolve(__dirname, './node_modules/@hpcc-js/wasm/dist/graphvizlib.wasm'), to: './static/js/' }],
    }),
  );

  return config;
};
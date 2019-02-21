const path = require('path');

module.exports = {
  mode: "production",
  entry: './index.js',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  target: "node",
  output: {
    filename: 'lit-scss-loader.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    library: "lit-scss-loader",   // Important
    libraryTarget: 'umd',   // Important
    umdNamedDefine: true   // Important
  },
};

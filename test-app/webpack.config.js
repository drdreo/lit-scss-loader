const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              outputPath: 'dist/images/',
              publicPath: 'dist/images/',
            },
          },
        ],
      },
      {
        test: /\.css|\.s(c|a)ss$/,
        use: [{
          loader: path.resolve('../dist/lit-scss-loader.js'),
          options: {
            // defaultSkip: true,
            minify: true
          },
        }, 'extract-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, './index.html'),
      filename: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  }
};

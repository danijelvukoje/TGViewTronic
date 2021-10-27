const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );

module.exports = {
  entry: './src/index.js',
  plugins: [new MiniCssExtractPlugin(), new webpack.DefinePlugin({
    "process.env": dotenv.parsed
  })],
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          // {loader: 'style-loader'},
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true,
    },
    compress: true,
    port: 9000,
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

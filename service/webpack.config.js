const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
    }),
    new Dotenv({
      path: path.resolve(__dirname, `./.env`),
    }),
    new ESLintPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public/logo30.png' }, { from: 'public/_redirects' }],
    }),
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true,
    hot: true,
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  entry: {
    app: ['babel-polyfill', './src/index.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/preset-env',
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
            '@babel/preset-typescript',
          ],
          plugins: [
            [
              '@babel/plugin-transform-runtime',
              {
                regenerator: true,
              },
            ],
          ],
        },
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};

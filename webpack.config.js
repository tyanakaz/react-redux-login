const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const publidDir = path.join(__dirname, '/public');

module.exports = [
  {
    mode: process.env.MODE_ENV || 'development',
    entry: [
      './src/index.js',
    ],
    output: {
      path: publidDir,
      publicPath: '/',
      filename: 'bundle.js',
    },
    module: {
      rules: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
      }],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      port: 8080,
      historyApiFallback: true,
      contentBase: publidDir,
    },
  },
  {
    mode: process.env.MODE_ENV || 'development',
    entry: {
      style: './stylesheets/index.css',
    },
    output: {
      path: publidDir,
      publicPath: '/',
      filename: 'bundle.css',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader", "postcss-loader",
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "./stylesheets/index.css",
        chunkFilename: "index.css"
      }),
      new HtmlWebPackPlugin({
        template: "./public/index.html",
        filename: "./index.html"
      }),
    ]
  },
];

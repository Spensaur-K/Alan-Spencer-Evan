"use strict";

const path = require("path"),
      fs = require("fs");

const webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

const BANNER = require("./banner"),
      PACKAGE = require("./package.json");

module.exports = {
  entry: "./client/main.js",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },

  resolve: {
    extensions: ['', '.js', '.ts', '.css', 'scss']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?{presets: "es2015"}',
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      },
    ]
  },

  plugins: [
    new webpack.BannerPlugin(BANNER, {entryOnly: true}),
    new HtmlWebpackPlugin({
      template: "client/index.ejs",
      title: PACKAGE.name
    }),
    new ExtractTextPlugin("[name].css"),
    //new webpack.optimize.UglifyJsPlugin(),
  ]
};
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
    path: path.join(__dirname, "public/app"),
    filename: "bundle.js"
  },

  resolve: {
    extensions: ['', '.js', '.css', 'scss', '.html', '.hbs'],
    alias: {
      'handlebars': 'handlebars/runtime'
    }
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?{presets: "es2015"}',
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json',
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars'
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
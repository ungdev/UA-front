// Always restart the dev server if you edit this file
// For "Port 8080 is already in use." -> taskkill /F /IM node.exe (Windows only)

const path = require('path');
const Dotenv = require('dotenv-webpack');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const withProgressBar = require('next-progressbar');

// Dot env config
require('dotenv').config({
  path: path.resolve(__dirname, '.env'),
});

// Next config
const nextJSConfig = {
  webpack: (c) => {
    const config = c;
    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true,
      }),

      // Cache misery, todo: follow this issue https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250 ?
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
      }),
    ];

    return config;
  },
  useFileSystemPublicRoutes: false,
};

const progressBarConfig = {
  progressBar: {
    profile: process.env.NODE_ENV !== 'development',
  },
};

module.exports = withPlugins(
  [withCSS, withImages, [withProgressBar, progressBarConfig]],
  nextJSConfig,
);

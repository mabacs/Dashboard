const mix = require('laravel-mix');
const webpack = require('webpack');
const { resolve } = require('path');
const aliases = require('./bin/pathMapping');

const webpackConfig = {
  output: {
    publicPath: '',
  },

  resolve: {
    alias: Object.assign(aliases, {
      '~': resolve(__dirname, 'src'),
    }),
  },
};

mix
  .webpackConfig(webpackConfig)
  .setPublicPath('dist')
  .js('src/main.js', 'dist/js');

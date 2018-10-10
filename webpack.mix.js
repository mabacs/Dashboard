const mix = require('laravel-mix');
const webpack = require('webpack');
const { resolve } = require('path');
const aliases = require('./bin/pathMapping');

const webpackConfig = {
    devServer: {
        port: 8080,
        proxy: {
            '/api/*': {
                host: 'localhost',
                target: 'http://localhost:4392/',
                rewrite(req) {
                    req.url = req.url.replace(/^\/api(.+)$/, '$1');
                },
            },
        },
    },

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

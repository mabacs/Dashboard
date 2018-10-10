const aliases = require('./bin/pathMapping');
const { resolve } = require('path');

module.exports = {
    configureWebpack: {
        devServer: {
            port: 8080,
            proxy: {
                '/api/*': {
                    target: 'http://127.0.0.1:4392/',
                    pathRewrite: {
                        '^/api': '',
                    },
                },
            },
        },

        resolve: {
            alias: Object.assign(aliases, {
                '~': resolve(__dirname, 'src'),
            }),
        },
    },

    baseUrl: undefined,
    outputDir: undefined,
    assetsDir: undefined,
    runtimeCompiler: true,
    productionSourceMap: undefined,
    parallel: undefined,
    css: undefined,
};

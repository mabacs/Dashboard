/* global require, __dirname, module */
const glob = require('glob');
const { resolve } = require('path');

const baseDir = resolve(__dirname, '../');

const options = {
    cwd: 'src/',
    vue: 'app/**/*.vue',
    js: 'js/**/*.js',
};

function parseFile(file) {
    return file.replace(/[I|i]ndex/g, '')
        .split('/')
        .reduce(
            (str, dir) => `${str}${dir.charAt(0).toUpperCase()}${dir.slice(1)}`,
            '',
        );
}

const vueFiles = glob.sync(
    options.vue,
    {
        nodir: true,
        cwd: options.cwd,
    },
);

const jsFiles = glob.sync(
    options.js,
    {
        nodir: true,
        cwd: options.cwd,
    },
);

const aliases = {};

const files = [];

files.concat
    .apply(
        vueFiles.map(file => ({
            key: parseFile(file).replace(/.vue/g, ''),
            value: resolve(baseDir, `${options.cwd}${file}`),
        })),

        jsFiles.map(file => ({
            key: `Lib${parseFile(file)
                .replace(/.js/g, '')
                .slice(2)}`,
            value: resolve(baseDir, `${options.cwd}${file}`),
        })),
    )
    .forEach(file => {
        aliases[`${file.key}`] = file.value;
    });

module.exports = aliases;

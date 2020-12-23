const webpack = require('webpack');
const path = require('path');
const config = require('../config');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        vendor: ['vue', 'vue-router', 'vuex', 'element-ui', 'moment'],
    },
    output: {
        path: path.resolve(__dirname, config.dirname),
        filename: "[name].dll.js",
        library: '[name]_library'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            context: __dirname,
            path: path.resolve(__dirname, config.dirname, '[name]-manifest.json'),
            name: '[name]_library'
        }),
        new MomentLocalesPlugin()
    ]
}

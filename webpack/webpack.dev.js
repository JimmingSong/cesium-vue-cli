const path = require('path');
const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {alias, extensions, cesiumSource, cesiumWorkers} = require('./common.config');
const resolve = path.resolve;
module.exports = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        main: ['webpack-hot-middleware/client?path=/__webpack_hmr', resolve(__dirname, '../client/main.js')]
    },
    output: {
        filename: "[name][hash].js",
        path: resolve(__dirname, "../build"),
        sourcePrefix: ''
    },
    amd: {
        toUrlUndefined: true
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: "pre",
                include: resolve(__dirname, '../client')
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: resolve(__dirname, '../client')
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader', 'css-loader', 'postcss-loader',
                    {
                        loader: "less-loader",
                        options: {}
                    }
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg|svg|ico)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            outputPath: 'static/image'
                        }
                    }
                ]
            },
            {
                test: /\.(svg|woff|ttf|eot)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'static/font'
                        }
                    }
                ]
            },
            {
                test: /\.worker\.js$/,
                use: {loader: "worker-loader"}
            }
        ]
    },
    resolve: {
        extensions,
        alias
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "cesium-cli",
            template: resolve(__dirname, '../views/dev.html')
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}

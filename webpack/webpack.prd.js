const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const {alias, extensions, cesiumSource, cesiumWorkers} = require('./common.config');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const resolve = path.resolve;
module.exports = {
    mode: "production",
    entry: {
        main: [resolve(__dirname, '../client/main.js')]
    },
    output: {
        filename: "static/js/[name][hash].js",
        path: resolve(__dirname, "../build"),
        sourcePrefix: ''
    },
    amd: {
        toUrlUndefined: true
    },
    module: {
        rules: [
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader',
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
    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             cesium: {
    //                 name: 'cesium',
    //                 test: /[\\/]node_modules[\\/](cesium)[\\/]/,
    //                 chunks: "all",
    //                 enforce: true
    //             }
    //         }
    //     }
    // },
    plugins: [
        new VueLoaderPlugin(),
        new OptimizeCSSAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name][hash].css',
            ignoreOrder: true
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "cesium-cli",
            template: resolve(__dirname, '../views/prd.html')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../build/vendor-manifest.json')
        }),
        new AddAssetHtmlPlugin({
            filepath: resolve(__dirname, '../build/*.dll.js')
        }),
        // new AddAssetHtmlPlugin({
        //     filepath: resolve(__dirname, '../build/Cesium/Cesium.js')
        // }),
    ]
}

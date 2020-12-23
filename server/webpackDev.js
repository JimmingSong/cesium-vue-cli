const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
const {historyApiFallback} = require('koa2-connect-history-api-fallback');
const devWebpackConfig = require('../webpack/webpack.dev');
const webpack = require('webpack');
const Utils = require('./utils');
let utils = new Utils();
module.exports = function (app) {
    if (utils.isDev) {
        const compile = webpack(devWebpackConfig);
        const devMiddlewareOptions = {
            noInfo: true,
            publicPath: devWebpackConfig.output.publicPath,
            stats: {
                colors: true
            }
        }
        app.use(historyApiFallback())
            .use(webpackDevMiddleware(compile, devMiddlewareOptions))
            .use(webpackHotMiddleware(compile));
    }
}

const path = require('path');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const views = require('koa-views');
const session = require('koa-session');
require('colors');
const compress = require('koa-compress');

const config = require('../config');
const ServerMethod = require('./utils');
const routerFun = require('./router');
const webpackDev = require('./webpackDev');

let app = new Koa();
const router = new Router();

const utils = new ServerMethod();
let resolve = path.resolve;
app.keys = ['some secret keys'];
const staticOption = utils.isDev ? {} : {maxage: 3000};
const port = config.port || 8080;

app.use(compress({threshold: 2048}))
    .use(session({sameSite: 'strict'}, app))
    .use(bodyParser())
    .use(views((resolve(__dirname, config.dirname)), {extension: 'html'}))
    .use(router.routes())
    .use(router.allowedMethods())
    .use(koaStatic(resolve(__dirname, config.dirname), staticOption))
    .use(koaStatic(resolve(__dirname, '../static')));

webpackDev(app);

routerFun(router);

app.on('error', (err, ctx) => {
    if (ctx.request.url !== '/__webpack_hmr' && ctx.request.url.indexOf('hot-update.json') < 0) {
        console.error('错误信息:', err);
        console.error('错误信息请求地址:', ctx.request.url);
        console.log('------------------------------------------');
    }
});

app.listen(port, () => {
    console.log(`\n\n------------------------------------------------\n`.rainbow);
    console.log(`正在监听: ${port}`.red);
    console.log(`当前环境: ${process.env.NODE_ENV}`.red);
    console.log(`\n------------------------------------------------\n\n`.rainbow);
});

const config = require('../config');
module.exports = function (router) {
    router.get(/^\/getConfig/, async ctx => {
        ctx.response.body = {config, success: true};
    });
};

const path = require('path');
const resolve = path.resolve;
module.exports = {
    extensions: ['.js', '.vue', '.less', '.css'],
    alias: {
        'Cesium': resolve(__dirname, '../node_modules/cesium/Source'),
        '@asset': resolve(__dirname, '../client/asset'),
        '@cesium': resolve(__dirname, '../client/cesium'),
        '@directive': resolve(__dirname, '../client/directive'),
        '@filters': resolve(__dirname, '../client/filters'),
        '@lib': resolve(__dirname, '../client/lib'),
        '@mixins': resolve(__dirname, '../client/mixins'),
        '@req': resolve(__dirname, '../client/request'),
        '@routes': resolve(__dirname, '../client/routes'),
        '@pages': resolve(__dirname, '../client/pages'),
        '@store': resolve(__dirname, '../client/store'),
        '@style': resolve(__dirname, '../client/style'),
        '@worker': resolve(__dirname, '../client/worker')
    },
    cesiumSource: 'node_modules/cesium/Source',
    cesiumWorkers: '../Build/Cesium/Workers'
}
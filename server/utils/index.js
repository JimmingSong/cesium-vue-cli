module.exports = class ServerMethod {
    get isDev () {
        return process.env.NODE_ENV === 'development';
    }
}

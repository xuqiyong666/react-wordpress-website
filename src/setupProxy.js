
const proxy = require('http-proxy-middleware');
// const morgan = require("morgan");

module.exports = function (app) {

    app.use(
        '/api-local/', proxy({
            target: 'https://blog.xuqiyong.com/',
            changeOrigin: true,
            autoRewrite: true,
            pathRewrite: {
                '/api-local/': '/'
            }
        })
    );

    // app.use(morgan('combined'));
};
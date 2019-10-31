
const proxy = require('http-proxy-middleware');
// const morgan = require("morgan");

module.exports = function (app) {

    app.use(
        '/api-local/', proxy({
            target: 'https://blog.jeffrey6052.com/',
            changeOrigin: true,
            autoRewrite: true,
            pathRewrite: {
                '/api-local/': '/'
            }
        })
    );

    // app.use(morgan('combined'));
};
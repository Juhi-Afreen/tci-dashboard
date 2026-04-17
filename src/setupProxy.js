const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/tci-jobs-api',
        createProxyMiddleware({
            target: 'https://jobs.transcriptioncertificationinstitute.org',
            changeOrigin: true,
            secure: false,
            pathRewrite: { '^/tci-jobs-api': '' },
        })
    );
    app.use(
        '/tci-forum-api',
        createProxyMiddleware({
            target: 'https://forum.transcriptioncertificationinstitute.org',
            changeOrigin: true,
            secure: false,
            pathRewrite: { '^/tci-forum-api': '' },
        })
    );
};

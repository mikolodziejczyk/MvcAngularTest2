var Agent = require("agentkeepalive");

var keepaliveAgent = new Agent({
    maxSockets: 100,
    keepAlive: true,
    maxFreeSockets: 10,
    keepAliveMsecs: 1000,
    timeout: 60000,
    keepAliveTimeout: 30000 // free socket keepalive for 30 seconds
});

var onProxyRes = function (proxyRes, req, res) {
    var key = 'www-authenticate';
    proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
};

const PROXY_CONFIG = [
    {
        target: "http://localhost:49842",
        context: "/api",
        secure: false,
        changeOrigin: true,
        auth: "LOGIN:PASS",
        loglevel: "debug",
        onProxyRes: onProxyRes,
        agent: keepaliveAgent
    }
];
module.exports = PROXY_CONFIG;
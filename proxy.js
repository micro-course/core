const httpProxy = require("http-proxy");
//
// Create your proxy server and set the target in the options.
//
httpProxy
  .createProxyServer({ target: process.env.EVENT_STORE_DB_URL })
  .listen(2113);

const PROXY_CONFIG = {
  "/api": {
      "target": "http://localhost:3002",
      "changeOrigin": true,
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
          "^/api": ""
      }
 }
};
module.exports = PROXY_CONFIG;
const PROXY_CONFIG = {
  "/api": {
      "target": "localhost:3000",
      "changeOrigin": true,
      "secure": false,
      "logLevel": "debug",
      "pathRewrite": {
          "^/api": ""
      }
 }
};
module.exports = PROXY_CONFIG;
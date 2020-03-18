const { createProxyMiddleware } = require('http-proxy-middleware');

const filter = function (pathname, req) {

  let isUploads = pathname.includes('/uploads');

  if (isUploads && req.method === 'GET') {
    return true;
  } else {
    return false;
  }
};

const apiProxy = createProxyMiddleware(filter, {
  target: "http://localhost:3002"
});

module.exports = function (app) {
  app.use(apiProxy);
};
if(process.env.NODE_ENV === 'production') return false
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = app => {
  app.use(
    '/api/auth',
    createProxyMiddleware({
      target: process.env.REACT_APP_AUTH_SERVICE_URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/cart',
    createProxyMiddleware({
      target: process.env.REACT_APP_CART_SERVICE_URL,
      changeOrigin: true,
    })
  );
  app.use(
    '/api/products',
    createProxyMiddleware({
      target: process.env.REACT_APP_PRODUCT_SERVICE_URL,
      changeOrigin: true,
    })
  );
};
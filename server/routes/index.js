const routes = require('express').Router();
const { isAuthenticated } = require('../middlewares');
const auth = require('./auth');
const products = require('./products');
const carts = require('./carts');
const users = require('./users');


routes.use('/auth', auth);
routes.use('/products', products);
routes.use('/cart',isAuthenticated, carts);
routes.use('/users',isAuthenticated, users);
module.exports = routes;

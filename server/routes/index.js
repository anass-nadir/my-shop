const routes = require('express').Router();
const { authenticateToken } = require('../utils');
const users = require('./users');
const products = require('./products');
const carts = require('./carts');
routes.use('/users', users);
routes.use('/products', products);
routes.use('/cart', authenticateToken, carts);
module.exports = routes;

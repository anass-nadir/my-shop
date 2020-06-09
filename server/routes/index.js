const routes = require('express').Router();
const users = require('./users');
const products = require('./products');

routes.use('/users', users);
routes.use('/products', products);

module.exports = routes; 
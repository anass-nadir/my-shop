const router = require('express').Router();
const productsSeeder = require('../db-seeds/products');
const productCtrl = require('../controllers/products');

router.get('/seed', productsSeeder);
router.get('/', productCtrl.getProducts);
module.exports = router;

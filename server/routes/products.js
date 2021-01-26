const router = require('express').Router();
const productCtrl = require('../controllers/products');

router.get('/', productCtrl.getProducts);
router.get('/categories', productCtrl.getCategories);
module.exports = router;

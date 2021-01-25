const router = require('express').Router();
const cartCtrl = require('../controllers/carts');
const payCtrl = require('../controllers/payments');
router.get('/', cartCtrl.getCart);
router.put('/refresh', cartCtrl.updateCart);
router.post('/payment', payCtrl.pay);
module.exports = router;

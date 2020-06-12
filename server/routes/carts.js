const router = require('express').Router();
const cartCtrl = require('../controllers/carts');

router.get('/', cartCtrl.getCart);
router.put('/refresh', cartCtrl.updateCart);
module.exports = router;

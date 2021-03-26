const router = require('express').Router();
const cartCtrl = require('../controller');

router.get('/', cartCtrl.getCart);
router.put('/refresh', cartCtrl.updateCart);

module.exports = router;

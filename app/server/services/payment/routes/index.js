const router = require('express').Router();
const payCtrl = require('../controller');

router.post('/pay', payCtrl.pay);
module.exports = router;

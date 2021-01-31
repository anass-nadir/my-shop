const router = require('express').Router();

const userCtrl = require('../controllers/users');

router.get(
  '/get-profile',
  userCtrl.getLoggedUser
);

module.exports = router;

const router = require('express').Router();
const passport = require('passport');
const userCtrl = require('../controllers/users');

router.post('/create', userCtrl.createUser);
router.post('/login', userCtrl.login);
router.get('/check-token', userCtrl.checkToken);
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }));
module.exports = router;

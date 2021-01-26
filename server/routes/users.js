const router = require('express').Router();
const { body } = require('express-validator');
const passport = require('passport');
const userCtrl = require('../controllers/users');

router.post(
  '/create',
  [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty(),
    body('confirmPassword')
      .notEmpty()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password mismatch');
        }
        return true;
      })
  ],
  userCtrl.createUser
);
router.post(
  '/login',
  [body('email').notEmpty().isEmail(), body('password').notEmpty()],
  userCtrl.login
);
router.get('/check-token', body('token').isJWT(), userCtrl.checkToken);
router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);
module.exports = router;

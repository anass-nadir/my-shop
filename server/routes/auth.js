const router = require('express').Router();
const { body } = require('express-validator');
const { fieldsValidation, isAuthenticated } = require('../middlewares');
const { passport } = require('../services');
const userCtrl = require('../controllers/auth');

router.post(
  '/register',
  [
    body('email').notEmpty().isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('A strong password is required'),
    body('confirmPassword')
      .notEmpty()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password mismatch');
        }
        return true;
      })
  ],
  fieldsValidation,
  userCtrl.createUser
);
router.post(
  '/login',
  [
    body('email').notEmpty().isEmail().withMessage('A valid email is required'),
    body('password').notEmpty().withMessage('A strong password is required')
  ],
  fieldsValidation,
  userCtrl.login
);

/* router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
); */
/* router.get('/google/callback/', passport.authenticate('google'), (req, res) => {
  return res.status(201).json({
    success: true,
    user: Object.assign(req.user, { password: undefined }),
    message: 'User created!'
  });
  // res.redirect(`${process.env.PUBLIC_URL}/signin?auth-token=${token}`);
}); */
router.get('/logout',isAuthenticated, userCtrl.logoutUser);
module.exports = router;

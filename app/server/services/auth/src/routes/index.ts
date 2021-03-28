import { Router } from 'express';
import { body } from 'express-validator';
import { fieldsValidation, currentUser } from '@anass-nadir/my-shop-common';
import { createUser, login, logoutUser } from '../controller';

const router = Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().isEmail().withMessage('A valid email is required'),
    body('password')
      .notEmpty()
      .trim()
      .withMessage('A strong password is required'),
    body('confirmPassword')
      .notEmpty()
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password mismatch');
        }
        return true;
      })
  ],
  fieldsValidation,
  createUser
);
router.post(
  '/login',
  [
    body('email').notEmpty().isEmail().withMessage('A valid email is required'),
    body('password')
      .notEmpty()
      .trim()
      .withMessage('A strong password is required')
  ],
  fieldsValidation,
  login
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
router.get('/current-user', currentUser, (req, res) => {
  res.send({
    user: req.currentUser || null,
    success: req.currentUser !== null
  });
});
router.get('/logout', logoutUser);
export default router;

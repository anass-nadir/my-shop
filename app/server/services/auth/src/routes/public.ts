import { Router } from 'express';
import { body } from 'express-validator';
import { fieldsValidation } from '@anass-nadir/my-shop-common';
import { createUser, loginUser } from '../controllers';

const router = Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('A valid email is required'),
    body('phone')
      .notEmpty()
      .withMessage('Phone number is required')
      .isMobilePhone('any')
      .withMessage('A valid phone number is required'),
    body('town').notEmpty().withMessage('Please enter your city'),
    body('country').notEmpty().withMessage('Please enter your country'),
    body('address').notEmpty().withMessage('Please enter your address'),
    body('password')
      .notEmpty()
      .trim()
      .isStrongPassword({ minLength: 6, minSymbols: 1, returnScore: true })
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
    body('email')
      .notEmpty()
      .withMessage('Please enter your email')
      .isEmail()
      .withMessage('A valid email is required'),
    body('password').notEmpty().trim().withMessage('Please enter your password')
  ],
  fieldsValidation,
  loginUser
);

export { router as publicRoutes };

import { body } from 'express-validator';
import User from '../models';

export const userFieldsValidations = {
  register: [
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .bail()
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid email is required')
      .bail()
      .custom(async value => {
        const count = await User.countDocuments({ email: value });
        return count && Promise.reject('E-mail already in use !');
      }),
    body('phone')
      .notEmpty()
      .withMessage('Phone number is required')
      .bail()
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
      .withMessage('Please confirm your password')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Password mismatch');
        }
        return true;
      })
  ],
  login: [
    body('email')
      .notEmpty()
      .withMessage('Please enter your email')
      .bail()
      .isEmail()
      .normalizeEmail()
      .withMessage('A valid email is required'),
    body('password').notEmpty().trim().withMessage('Please enter your password')
  ]
};

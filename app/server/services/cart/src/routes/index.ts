import { Router } from 'express';
import { getCart, updateCart } from '../controller';
import { body } from 'express-validator';
import { fieldsValidation } from '@anass-nadir/my-shop-common';

const router = Router();

router.get('/', getCart);
router.put(
  '/refresh',
  [
    body('total')
      .notEmpty()
      .withMessage('Total is required')
      .bail()
      .isFloat({ gt: 0 })
      // .isDecimal({ force_decimal: true, decimal_digits: '2' })
      .withMessage('A valid total required'),
    body('products')
      .notEmpty()
      .withMessage('Products list is required')
      .bail()
      .isArray({ min: 1 })
      .withMessage('Products list must be an array of objects'),
    body('products.*.price')
      .notEmpty()
      .withMessage('Price is required')
      .bail()
      .isFloat({ gt: 0 })
      // .isDecimal({force_decimal: true, decimal_digits: "2"})
      .withMessage('Price must be a positive decimal'),
    body('products.*.quantity')
      .notEmpty()
      .withMessage('Quantity is required')
      .bail()
      .isFloat({ gt: 0 })
      .withMessage('Quantity must be a positive decimal'),
    body('products.*._id')
      .notEmpty()
      .withMessage('Product id is required')
      .isMongoId()
      .withMessage('A valid product id is required'),
    body('products.*.imagesUrls')
      .optional()
      .isURL()
      .withMessage('A valid image url is required')
  ],
  fieldsValidation,
  updateCart
);

export default router;

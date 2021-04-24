import { Router } from 'express';
import { body } from 'express-validator';
import {
  isAuthenticated,
  currentUser,
  fieldsValidation
} from '@anass-nadir/my-shop-common';
import { createCategory, createProduct } from '../controllers';

const router = Router();

router.use([currentUser, isAuthenticated]);

router.post(
  '/create',
  [
    body('name').notEmpty().withMessage("Product's name is required"),
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .isDecimal()
      .withMessage('Price must be decimal'),
    body('quantity')
      .notEmpty()
      .withMessage('Quantity is required')
      .isDecimal()
      .withMessage('Quantity must be decimal'),
    body('categoryId').notEmpty().withMessage('Category is required'),
    body('imageUrl')
      .notEmpty()
      .isURL()
      .withMessage('A valid image url is required')
  ],
  fieldsValidation,
  createProduct
);

router.post(
  '/create-category',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('slug')
      .notEmpty()
      .withMessage('Slug is required')
      .isSlug()
      .withMessage('A valid slug is required'),
    body('imageUrl')
      .notEmpty()
      .isURL()
      .withMessage('A valid image url is required')
  ],
  fieldsValidation,
  createCategory
);
export { router as privateRoutes };

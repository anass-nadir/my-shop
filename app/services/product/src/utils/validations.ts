import { body, CustomValidator } from 'express-validator';
import { Category } from '../models/category';

const categoryFieldExist: CustomValidator = async (value, { path }) => {
  const count = await Category.countDocuments({ [path]: value });
  if (count) {
    return Promise.reject(`${value} already in use !`);
  }
};
const checkQuantity: CustomValidator = (value, { req }) => {
  if (req.body.reserved && value < req.body.reserved) {
    throw new Error('Quantity must be greater or equal to reserved !');
  }
  return true;
};
const checkReserved: CustomValidator = (value, { req }) => {
  if (value > req.body.quantity) {
    throw new Error('Reserved must be less or equal to quantity !');
  }
  return true;
};

export const productFieldsValidations = {
  create: [
    body('name').notEmpty().withMessage("Product's name is required"),
    body('price')
      .notEmpty()
      .withMessage('Price is required')
      .bail()
      .isDecimal()
      .withMessage('Price must be decimal'),
    body('quantity')
      .notEmpty()
      .withMessage('Quantity is required')
      .bail()
      .isDecimal()
      .withMessage('Quantity must be decimal')
      .custom(checkQuantity),
    body('reserved')
      .optional()
      .isDecimal()
      .withMessage('Reserved quantity must be decimal')
      .bail()
      .custom(checkReserved),
    body('_categoryId')
      .optional()
      .isMongoId()
      .withMessage('A valid Category Id is required'),
    body('imagesUrls')
      .optional()
      .isArray()
      .withMessage('Must be an array of urls'),
    body('imagesUrls.*')
      .optional()
      .isURL()
      .withMessage('A valid image url is required')
  ],
  delete: [
    body('_id')
      .notEmpty()
      .withMessage('Product Id is required')
      .isMongoId()
      .withMessage('A valid id is required')
  ],
  withCategory: [
    body('_categoryId')
      .notEmpty()
      .withMessage('Category Id is required')
      .isMongoId()
      .withMessage('A valid category id is required'),
    body('_productIds')
      .notEmpty()
      .withMessage('product Id is required')
      .isArray()
      .withMessage('A valid product id is required'),
    body('_productIds.*')
      .isMongoId()
      .withMessage('A valid product id is required')
  ]
};
export const categoryFieldsValidations = {
  create: [
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .custom(categoryFieldExist),
    body('slug')
      .notEmpty()
      .withMessage('Slug is required')
      .isSlug()
      .withMessage('A valid slug is required')
      .custom(categoryFieldExist),
    body('imagesUrls')
      .optional()
      .isArray()
      .withMessage('Must be an array of urls'),
    body('imagesUrls.*')
      .optional()
      .isURL()
      .withMessage('A valid image url is required')
  ],
  delete: [
    body('_id')
      .notEmpty()
      .withMessage('category Id is required')
      .isMongoId()
      .withMessage('A valid id is required')
  ]
};

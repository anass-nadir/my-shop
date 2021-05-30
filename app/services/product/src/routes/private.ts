import { Router } from 'express';
import {
  categoryFieldsValidations,
  productFieldsValidations
} from '../utils/validations';
import { isAuthenticated, fieldsValidation } from '@anass-nadir/my-shop-common';
import { categoryController, productController } from '../controllers';

const router = Router();

router.use(isAuthenticated);

router.post(
  '/create',
  productFieldsValidations.create,
  fieldsValidation,
  productController.create
);

router.post(
  '/category/create',
  categoryFieldsValidations.create,
  fieldsValidation,
  categoryController.create
);
router.delete(
  '/',
  productFieldsValidations.delete,
  fieldsValidation,
  productController.destroy
);
router.delete(
  '/category',
  categoryFieldsValidations.delete,
  fieldsValidation,
  categoryController.destroy
);
router.post(
  '/with-category',
  productFieldsValidations.withCategory,
  fieldsValidation,
  productController.attachWithCategory
);
export { router as privateRoutes };

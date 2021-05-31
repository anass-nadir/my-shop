import { Router } from 'express';
import { fieldsValidation } from '@anass-nadir/my-shop-common';
import { createUser, loginUser } from '../controllers';
import { userFieldsValidations } from '../utils';

const router = Router();

router.post(
  '/register',
  userFieldsValidations.register,
  fieldsValidation,
  createUser
);
router.post('/login', userFieldsValidations.login, fieldsValidation, loginUser);

export { router as publicRoutes };

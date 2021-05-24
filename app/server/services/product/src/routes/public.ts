import { Router } from 'express';
import { categoryController, productController } from '../controllers';

const router = Router();

router.get('/', productController.index);
router.get('/categories', categoryController.index);

export { router as publicRoutes };

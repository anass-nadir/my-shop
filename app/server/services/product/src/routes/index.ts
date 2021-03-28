import { Router } from 'express';
import { getCategories, getProductsWithCategories } from '../controllers';

const router = Router();

router.get('/', getProductsWithCategories);
router.get('/categories', getCategories);
export default router;

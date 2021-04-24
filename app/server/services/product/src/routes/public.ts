import { Router } from 'express';
import { getCategories, getInventory } from '../controllers';

const router = Router();

router.get('/', getInventory);
router.get('/categories', getCategories);

export { router as publicRoutes };

import { Router } from 'express';
import { getCart, updateCart } from '../controller';

const router = Router();

router.get('/', getCart);
router.put('/refresh', updateCart);

export default router;

import { Router } from 'express';
import { pay } from '../controller';
const router = Router();

router.post('/pay', pay);
export default router;

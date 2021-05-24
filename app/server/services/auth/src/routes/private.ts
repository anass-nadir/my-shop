import { Router } from 'express';
import { isAuthenticated } from '@anass-nadir/my-shop-common';
import { logoutUser, authenticatedUser } from '../controllers';

const router = Router();

router.use(isAuthenticated);

router.get('/current-user', authenticatedUser);
router.post('/logout', logoutUser);

export { router as privateRoutes };

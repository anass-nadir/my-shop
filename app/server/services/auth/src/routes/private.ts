import { Router } from 'express';
import { isAuthenticated, currentUser } from '@anass-nadir/my-shop-common';
import { logoutUser, authenticatedUser } from '../controllers';

const router = Router();

router.use([currentUser, isAuthenticated]);

router.get('/current-user', authenticatedUser);
router.get('/logout', logoutUser);

export { router as privateRoutes };

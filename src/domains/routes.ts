import { Router } from 'express';
import restaurantRoute from './restaurants/routes';
import authRoute from './auth/routes'

const router = Router();

router.use('/auth', authRoute);

router.use('/restaurants', restaurantRoute);

export default router;

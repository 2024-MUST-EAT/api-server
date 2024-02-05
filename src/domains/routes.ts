import { Router } from 'express';
import restaurantRoute from './restaurants/routes';

const router = Router();

router.use('/restaurants', restaurantRoute);

export default router;

import { Router } from 'express';
import { RestaurantsRepository } from './restaurants.repository';
import { RestaurantsService } from './restaurants.service';
import { RestaurantController } from './restaurants.controller';

const router = Router();

const service = new RestaurantsService(new RestaurantsRepository());
const controller = new RestaurantController(service);

router.get('/', controller.getRestaurants);
router.get('/:id', controller.getRestaurantById);
router.post('/', controller.addRestaurant);
router.put('/:id', controller.updateRestaurant);

export default router;

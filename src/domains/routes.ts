import { Router } from 'express';
import { RestaurantController } from './restaurants/restaurants.controller';
import { RestaurantsService } from './restaurants/restaurants.service';
import { RestaurantsRepository } from './restaurants/restaurants.repository';

const route = Router();
const service = new RestaurantsService(new RestaurantsRepository());
const controller = new RestaurantController(service);

route.get('/', controller.getRestaurants);
route.get('/:id', controller.getRestaurantById);
route.post('/', controller.addRestaurant);
route.put('/:id', controller.updateRestaurant);

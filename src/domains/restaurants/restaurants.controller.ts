import { Request, Response } from 'express';
import { IAddRestaurantDto } from './restaurants';
import { RestaurantsService } from './restaurants.service';

export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  async addRestaurant(req: Request, res: Response) {
    const addRestaurantDto: IAddRestaurantDto = req.body;
    const result = await this.restaurantService.addRestaurant(addRestaurantDto);
    return res.json(result);
  }

  async getRestaurants(_req: Request, res: Response) {
    const result = await this.restaurantService.getRestaurants();
    return res.json(result);
  }

  async getRestaurantById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const result = await this.restaurantService.getRestaurantById(id);
    return res.json(result);
  }

  async updateRestaurant(req: Request, res: Response) {
    const id = Number(req.params.id);
    const dto: IAddRestaurantDto = req.body;
    const result = await this.restaurantService.updateRestaurant(id, dto);
    return res.json(result);
  }
}

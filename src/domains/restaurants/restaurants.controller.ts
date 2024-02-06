import { Request, Response } from 'express';
import { IAddRestaurantDto } from './restaurants';
import { RestaurantsService } from './restaurants.service';

export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  addRestaurant = async (req: Request, res: Response) => {
    const addRestaurantDto: IAddRestaurantDto = req.body;
    try {
      const result = await this.restaurantService.addRestaurant(
        addRestaurantDto,
      );
      return res.status(201).json(result);
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }
      return res.status(400).json({ message: error.message });
    }
  };

  getRestaurants = async (_req: Request, res: Response) => {
    try {
      const result = await this.restaurantService.getRestaurants();
      return res.json(result);
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      return res.status(400).json({ message: error.message });
    }
  };

  getRestaurantById = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.restaurantService.getRestaurantById(id);
      return res.json(result);
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      if (error.message === 'Not found') {
        return res.status(404).json({ message: error.message });
      }

      return res.status(400).json({ message: error.message });
    }
  };

  updateRestaurant = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const dto: IAddRestaurantDto = req.body;
      const result = await this.restaurantService.updateRestaurant(id, dto);
      return res.json(result);
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }

      if (error.message === 'Not found') {
        return res.status(404).json({ message: error.message });
      }

      return res.status(400).json({ message: error.message });
    }
  };
}

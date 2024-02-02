import { IAddRestaurantDto } from './restaurants';

export class RestaurantsService {
  constructor(private readonly restaurantsRepository: unknown) {}

  async addRestaurant(
    addRestaurantDto: IAddRestaurantDto,
  ): Promise<{ id: number }> {
    return { id: 0 };
  }

  async getRestaurants() {
    return { count: 0, results: [] };
  }
}

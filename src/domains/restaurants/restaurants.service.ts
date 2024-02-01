import { ICreateRestaurantDto } from './restaurants';

export class RestaurantsService {
  constructor(private readonly restaurantsRepository: unknown) {}

  async addRestaurant(
    addRestaurantDto: ICreateRestaurantDto,
  ): Promise<{ id: number }> {
    return { id: 1 };
  }

  async getRestaurants() {
    return [];
  }
}

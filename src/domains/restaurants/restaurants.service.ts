import { IAddRestaurantDto, IGetRestaurantsDto } from './restaurants';

export class RestaurantsService {
  constructor(private readonly restaurantsRepository: unknown) {}

  async addRestaurant(
    addRestaurantDto: IAddRestaurantDto,
  ): Promise<{ id: number }> {
    return { id: 0 };
  }

  async getRestaurants(dto?: IGetRestaurantsDto) {
    return { count: 0, results: [] };
  }

  async getRestaurantById(id: number) {
    return { restaurant: {} };
  }

  async updateRestaurant(id: number, dto: IAddRestaurantDto) {
    return { id: 0 };
  }
}

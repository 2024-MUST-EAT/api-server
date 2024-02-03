import { IAddRestaurantDto, IGetRestaurantsDto } from './restaurants';
import { RestaurantsRepository } from './restaurants.repository';

export class RestaurantsService {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) {}

  async addRestaurant(addRestaurantDto: IAddRestaurantDto) {
    const id = await this.restaurantsRepository.addRestaurant(addRestaurantDto);
    return { id };
  }

  async getRestaurants(dto?: IGetRestaurantsDto) {
    const offset = dto?.offset || 0;
    const limit = dto?.limit || 10;
    return this.restaurantsRepository.getRestaurants({ offset, limit });
  }

  async getRestaurantById(id: number) {
    return this.restaurantsRepository.getRestaurantById(id);
  }

  async updateRestaurant(id: number, dto: IAddRestaurantDto) {
    return this.restaurantsRepository.updateRestaurant(id, dto);
  }
}

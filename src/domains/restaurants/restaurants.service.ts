import { IAddRestaurantDto, IGetRestaurantsDto } from './restaurants';
import { RestaurantsRepository } from './restaurants.repository';

export class RestaurantsService {
  constructor(private readonly restaurantsRepository: RestaurantsRepository) {}

  async addRestaurant(addRestaurantDto: IAddRestaurantDto) {
    this.validateRestaurant(addRestaurantDto);
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
    this.validateRestaurant(dto);
    return this.restaurantsRepository.updateRestaurant(id, dto);
  }

  private validateRestaurant(dto: Partial<IAddRestaurantDto>): void {
    // 필수 값들을 순회하면서 존재 여부를 확인합니다.
    const requiredFields: (keyof IAddRestaurantDto)[] = [
      'name',
      'categoryId',
      'kakaoId',
      'address',
      'latitude',
      'longitude',
    ];

    for (const field of requiredFields) {
      if (!(field in dto)) {
        console.error(`Missing required field: ${field}`);
        throw new Error(`Missing required field: ${field}`);
      }
    }
  }
}

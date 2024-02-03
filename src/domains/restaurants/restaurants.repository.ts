import {
  IAddRestaurantDto,
  IGetRestaurantsDto,
  IRestaurant,
} from './restaurants';

export class RestaurantsRepository {
  private readonly repository: IRestaurant[] = [];

  async addRestaurant(addRestaurantDto: IAddRestaurantDto) {
    this.repository.push({
      id: this.repository.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...addRestaurantDto,
    });
  }

  async getRestaurants() {
    return { count: this.repository.length, results: this.repository };
  }

  async getRestaurantById(id: number) {
    return { restaurant: this.repository.find((r) => r.id === id) };
  }

  async updateRestaurant(id: number, dto: IAddRestaurantDto) {
    const index = this.repository.findIndex((r) => r.id === id);
    if (index === -1) {
      throw new Error('Not found');
    }
    this.repository[index] = {
      ...this.repository[index],
      ...dto,
      updatedAt: new Date(),
    };
  }
}

import {
  IAddRestaurantDto,
  IGetRestaurantsDto,
  IRestaurant,
} from './restaurants';

export class RestaurantsRepository {
  private readonly repository: IRestaurant[] = [];

  async addRestaurant(addRestaurantDto: IAddRestaurantDto): Promise<number> {
    const id = this.repository.length + 1;
    this.repository.push({
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...addRestaurantDto,
    });

    return id;
  }

  async getRestaurants({ offset, limit }: IGetRestaurantsDto): Promise<{
    count: number;
    results: IRestaurant[];
  }> {
    return {
      count: this.repository.length,
      results: this.repository.slice(offset, offset! + limit!),
    };
  }

  async getRestaurantById(id: number): Promise<{ restaurant: IRestaurant }> {
    const restaurant = this.repository.find((r) => r.id === id);
    if (!restaurant) {
      throw new Error('Not found');
    }
    return { restaurant };
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

    return { id };
  }
}

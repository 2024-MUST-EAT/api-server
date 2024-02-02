import {
  IAddRestaurantDto,
  IRestaurant,
} from 'src/domains/restaurants/restaurants';
import { RestaurantsService } from 'src/domains/restaurants/restaurants.service';

describe('Restaurants API', () => {
  let service: RestaurantsService;
  let restaurantRepository: IRestaurant[];

  beforeAll(() => {
    restaurantRepository = [];
    service = new RestaurantsService(restaurantRepository);
  });

  describe('addRestaurant', () => {
    it('should create a new restaurant', async () => {
      const addRestaurantDto = {
        name: 'Sample Restaurant',
        categoryId: 1,
        kakaoId: '12345678',
        address: 'Sample Address',
        latitude: '123.45678',
        longitude: '123.45678',
        menus: ['Sample Menus'],
        images: ['Sample Images'],
        homepage: 'Sample Homepage',
        phone: '012-3456-7890',
      };

      const res = await service.addRestaurant(addRestaurantDto);

      expect(res.id).toBeGreaterThan(0);
    });
  });

  describe('getRestaurants', () => {
    const sampleRestaurants: IAddRestaurantDto[] = [
      {
        name: 'Test Restaurant',
        categoryId: 1,
        kakaoId: '12345678',
        address: 'Test Address',
        latitude: '123.45678',
        longitude: '123.45678',
        menus: ['Test Menus'],
        images: ['Test Images'],
        homepage: 'Test Homepage',
        phone: '012-3456-7890',
      },
      {
        name: 'Test Restaurant 2',
        categoryId: 1,
        kakaoId: '98765432',
        address: 'Test Address',
        latitude: '123.45678',
        longitude: '123.45678',
        menus: ['Test Menus'],
        images: ['Test Images'],
        homepage: 'Test Homepage',
        phone: '012-3456-7890',
      },
    ];
    beforeAll(async () => {
      await Promise.all(
        sampleRestaurants.map((restaurant) =>
          service.addRestaurant(restaurant),
        ),
      );
    });

    it('should return the correct count of restaurants', async () => {
      const res = await service.getRestaurants();
      expect(res.count).toEqual(2);
    });

    it('should return the correct length of results', async () => {
      const res = await service.getRestaurants();
      expect(
        res.results.map((restaurant: IRestaurant) =>
          sampleRestaurants.find(
            (sample) => sample.kakaoId === restaurant.kakaoId,
          ),
        ),
      ).toHaveLength(2);
    });

    it('should return the correct results', async () => {
      const res = await service.getRestaurants();
      const mapRestaurantsWithTimestampsAndId = (
        restaurants: IAddRestaurantDto[],
      ) =>
        restaurants.map((restaurant) => ({
          ...restaurant,
          id: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }));

      expect(res.results).toEqual(
        expect.arrayContaining(
          mapRestaurantsWithTimestampsAndId(sampleRestaurants),
        ),
      );
    });
  });

  it('should get a restaurant by id', async () => {});

  it('should update a restaurant', async () => {});
});

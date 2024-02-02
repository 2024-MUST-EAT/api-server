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

    it('should return the correct results with pagination', async () => {
      const res = await service.getRestaurants({ limit: 1, offset: 0 });
      expect(res.results).toHaveLength(1);
    });

    it('should return the correct results with pagination', async () => {
      const res = await service.getRestaurants({ limit: 1, offset: 1 });
      expect(res.results).toHaveLength(1);
    });
  });

  describe('getRestaurantById', () => {
    const restaurant = {
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
    };
    beforeAll(async () => {
      await service.addRestaurant(restaurant);
    });

    it('should get a restaurant by id', async () => {
      const res = await service.getRestaurantById(1);
      expect(res).toHaveLength(1);
      expect(res.restaurant).toEqual({
        ...restaurant,
        id: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should return null if the restaurant does not exist', async () => {
      const res = await service.getRestaurantById(2);
      expect(res).toBeNull();
    });
  });

  describe('updateRestaurant', () => {
    const restaurant = {
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
    };
    beforeAll(async () => {
      await service.addRestaurant(restaurant);
    });

    it('should update a restaurant', async () => {
      const id = 1;
      const updateRestaurant = {
        name: 'Updated Restaurant',
        categoryId: 1,
        kakaoId: '12345678',
        address: 'Updated Address',
        latitude: '123.45678',
        longitude: '123.45678',
        menus: ['Updated Menus'],
        images: ['Updated Images'],
        homepage: 'Updated Homepage',
        phone: '012-3456-7890',
      };
      const res = await service.updateRestaurant(id, updateRestaurant);

      const updatedRestaurant = await service.getRestaurantById(1);

      expect(res.id).toBe(id);
      expect(updatedRestaurant.restaurant).toEqual({
        ...updateRestaurant,
        id,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should return null if the restaurant does not exist', async () => {
      const res = await service.updateRestaurant(2, restaurant);
      expect(res).toBeNull();
    });

    it('should throw an error if required fields are missing or invalid', async () => {
      const updateRestaurant = {
        name: 'Updated Restaurant',
        categoryId: 1,
        kakaoId: 12345678,
        address: 'Updated Address',
        latitude: '123.45678',
        longitude: '123.45678',
        menus: ['Updated Menus'],
        images: ['Updated Images'],
        homepage: 'Updated Homepage',
      };

      await expect(
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-floating-promises -- ignore for testing
        service.updateRestaurant(1, updateRestaurant),
      ).rejects.toThrow();
    });
  });
});

import { IRestaurant } from 'src/domains/restaurants/restaurants';
import { RestaurantsService } from 'src/domains/restaurants/restaurants.service';

describe('Restaurants API', () => {
  let service: RestaurantsService;
  let restaurantRepository: IRestaurant[];

  beforeAll(() => {
    service = new RestaurantsService(restaurantRepository);
    restaurantRepository = [];
  });

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

  it('should get restaurants list', async () => {
    let id = 1;
    const sampleRestaurants = [
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
        kakaoId: '12345678',
        address: 'Test Address',
        latitude: '123.45678',
        longitude: '123.45678',
        menus: ['Test Menus'],
        images: ['Test Images'],
        homepage: 'Test Homepage',
        phone: '012-3456-7890',
      },
    ];
    await Promise.all(
      sampleRestaurants.map((restaurant) => service.addRestaurant(restaurant)),
    );
    restaurantRepository = sampleRestaurants.map((restaurant) => ({
      ...restaurant,
      id: id++,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    const res = await service.getRestaurants();

    expect(res.length).toEqual(2);
    expect(
      res.map((restaurant: IRestaurant) =>
        sampleRestaurants.find(
          (sample) => sample.kakaoId === restaurant.kakaoId,
        ),
      ),
    ).toHaveLength(2);
  });

  it('should get a restaurant by id', async () => {});

  it('should update a restaurant', async () => {});
});

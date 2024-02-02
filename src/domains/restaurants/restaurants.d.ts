export interface IAddRestaurantDto {
  name: string;
  categoryId: number;
  kakaoId: string;
  address: string;
  latitude: string;
  longitude: string;

  menus?: string[];
  images?: string[];
  homepage?: string;
  phone?: string;
}

export interface IRestaurant extends IAddRestaurantDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IGetRestaurantsDto {
  limit?: number;
  offset?: number;
}

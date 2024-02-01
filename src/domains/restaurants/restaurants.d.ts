export interface ICreateRestaurantDto {
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

export interface IRestaurant extends ICreateRestaurantDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

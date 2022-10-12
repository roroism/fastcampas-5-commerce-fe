import { Ireview } from '@components/ProductsPage/_fragments/ReviewItem';

export type gender = 'male' | 'female';

export type ProductDTOType = {
  // next: 'string';
  // previous: 'string';
  cursor: string;
  results: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    capacity: number;
    thumbnail: string;
    tags: Array<{ id: number; name: string }>;
    avgRate: number | null;
    reviewCount: number;
  }>;
};

export type ProductDetailDTOType = {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  detail: string;
  photo: string;
  reviewList: Array<Ireview>;
  avgRate: number;
  reviewCount: number;
};

export type MyInfoDTOType = {
  id?: number;
  name: string;
  nickname: string;
  phone: string;
  address: string;
  email: string;
  profile?: string;
  gender?: gender;
  age?: number;
};
export type MyInfoParamPatchType = {
  id?: string;
  // data: Partial<MyInfoDTOType>;
  data: FormData;
};

export interface Icartitem {
  id: number;
  productId: number;
  cartId: number;
  count: number;
}

export type CartDTOType = Array<{
  cartitem: Array<Icartitem>;
  id: number;
  userId: number;
}>;

export type CartItemDTOType = {
  id: number;
  productId: number;
  cartId: number;
  count: number;
};

export interface IPostCartItemRequestBody {
  productId: number;
  cartId: number;
  count: number;
}

export type ProductInCartItemDTOType = {
  count: number;
};

// export type CartDTOType = [
//   {
//     cartitem: Array<Icartitem>;
//     id: number;
//     userId: number;
//   },
// ];
export type CartParamGetType = {};

export type CartParamPostType = {};

export type CartItemParamPostType = {};

export type ProductInCartItemParamPutType = {
  id: number;
  data: FormData;
};

// export type ProductInCartItemParamPatchType = {
//   id: number;
//   data: FormData;
// };

export type ExampleDTOType = {};
export type ProductParamGetType = {};
export type MyInfoParamGetType = {};
export type ExampleParamPutType = {
  id: string;
  data: ProductDTOType;
};
export type ExampleParamPatchType = {
  id: string;
  data: Partial<ProductDTOType>;
};

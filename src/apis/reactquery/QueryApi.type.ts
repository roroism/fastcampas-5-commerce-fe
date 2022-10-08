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
    avgRate: string | null;
    reviewCount: number;
  }>;
};
export type MyInfoDTOType = {
  id: number;
  name: string;
  nickname: string;
  phone: string;
  address: string;
  email: string;
  profile: string;
  gender: gender;
  age: number;
};
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

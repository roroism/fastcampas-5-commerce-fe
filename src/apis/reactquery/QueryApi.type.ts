export type ProductDTOType = {
  next: 'string';
  previous: 'string';
  results: [
    {
      id: number;
      name: 'string';
      description: 'string';
      price: number;
      capacity: number;
      thumbnail: 'string';
      tags: 'string';
      avgRate: 'string';
      reviewCount: 'string';
    },
  ];
};
export type ExampleDTOType = {};
export type ProductParamGetType = {};
export type ExampleParamPutType = {
  id: string;
  data: ProductDTOType;
};
export type ExampleParamPatchType = {
  id: string;
  data: Partial<ProductDTOType>;
};

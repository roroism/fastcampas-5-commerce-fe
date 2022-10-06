export type ProductDTOType = {
  // next: 'string';
  // previous: 'string';
  cursor: string;
  results: [
    {
      id: number;
      name: string;
      description: string;
      price: number;
      capacity: number;
      thumbnail: string;
      tags: Array<{ id: number; name: string }>;
      avgRate: string | null;
      reviewCount: number;
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

import { MutationHookParams } from '@apis/type';

import { QueryClient, useMutation } from '@tanstack/react-query';

import productApi from './QueryApi';
import {
  CartItemParamPostType,
  CartParamPostType,
  ExampleDTOType,
  ExampleParamPatchType,
  ExampleParamPutType,
  IPostCartItemRequestBody,
  MyInfoParamPatchType,
} from './QueryApi.type';

export const MYINFO_API_MUTATION_KEY = {
  // POST: (param?: ExampleDTOType) => ['example-post', param],
  // PUT: (req?: ExampleParamPutType) => ['example-put', req],
  PATCH: (req?: MyInfoParamPatchType) => ['myinfo-patch', req],
  // DELETE: (id?: string) => ['example-delete', id],
};

export const usePatchMyInfoMutation = (
  params?: MutationHookParams<typeof productApi.patchMyInfo>,
) => {
  return useMutation(productApi.patchMyInfo, {
    ...params?.options,
  });
};

export const CART_API_MUTATION_KEY = {
  POST: (param?: CartParamPostType) => ['cart-post', param],
  // PUT: (req?: ExampleParamPutType) => ['example-put', req],
  // PATCH: (req?: MyInfoParamPatchType) => ['myinfo-patch', req],
  // DELETE: (id?: string) => ['example-delete', id],
};

export const usePostCartMutation = (
  params?: MutationHookParams<typeof productApi.postCart>,
) => {
  return useMutation(productApi.postCart, {
    ...params?.options,
  });
};

export const CART_ITEM_API_MUTATION_KEY = {
  POST: (param?: CartItemParamPostType) => ['cart-item-post', param],
  // PUT: (req?: ExampleParamPutType) => ['example-put', req],
  PUT: (req?: MyInfoParamPatchType) => ['cart-item-put', req],
  PATCH: (req?: MyInfoParamPatchType) => ['cart-item-patch', req],
  DELETE: (id?: string) => ['cart-item-delete', id],
};

export const usePostCartItemMutation = (
  productId: number,
  params?: MutationHookParams<typeof productApi.postCartItem>,
) => {
  return useMutation(
    CART_ITEM_API_MUTATION_KEY.POST(productId),
    productApi.postCartItem,
    {
      ...params?.options,
    },
  );
};

export const usePutProductInCartItemMutation = (
  params?: MutationHookParams<typeof productApi.putProductInCartItem>,
) => {
  return useMutation(productApi.putProductInCartItem, {
    ...params?.options,
  });
};

export const useDeleteExampleMutation = (
  params?: MutationHookParams<typeof productApi.deleteCartItem>,
) => {
  return useMutation(productApi.deleteCartItem, {
    ...params?.options,
  });
};

// export const usePatchProductInCartItemMutation = (
//   params?: MutationHookParams<typeof productApi.putProductInCartItem>,
// ) => {
//   return useMutation(productApi.putProductInCartItem, {
//     ...params?.options,
//   });
// };

// export const EXAMPLE_API_MUTATION_KEY = {
//   POST: (param?: ExampleDTOType) => ['example-post', param],
//   PUT: (req?: ExampleParamPutType) => ['example-put', req],
//   PATCH: (req?: ExampleParamPatchType) => ['example-patch', req],
//   DELETE: (id?: string) => ['example-delete', id],
// };

// export const usePostExampleMutation = (
//   params?: MutationHookParams<typeof exampleApi.postExample>,
// ) => {
//   return useMutation(exampleApi.postExample, {
//     ...params?.options,
//   });
// };

// export const usePutExampleMutation = (
//   params?: MutationHookParams<typeof exampleApi.putExample>,
// ) => {
//   return useMutation(exampleApi.putExample, {
//     ...params?.options,
//   });
// };
// export const usePatchExampleMutation = (
//   params?: MutationHookParams<typeof exampleApi.patchExample>,
// ) => {
//   return useMutation(exampleApi.patchExample, {
//     ...params?.options,
//   });
// };
// export const useDeleteExampleMutation = (
//   params?: MutationHookParams<typeof exampleApi.deleteExample>,
// ) => {
//   return useMutation(exampleApi.deleteExample, {
//     ...params?.options,
//   });
// };

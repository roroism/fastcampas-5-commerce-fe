import { QueryHookParams } from '@apis/type';

import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
  useQuery,
} from '@tanstack/react-query';

import productApi from './QueryApi';
import {
  CartParamGetType,
  MyInfoParamGetType,
  ProductDTOType,
  ProductParamGetType,
} from './QueryApi.type';

export const PRODUCT_API_QUERY_KEY = {
  GET: (param: ProductParamGetType = '') => ['product-list', param],
  GET_BY_ID: (id?: string) => ['product-by-id', id],
};

export function useGetProductListQuery(
  params?: QueryHookParams<typeof productApi.getProductList>,
) {
  const queryKey = PRODUCT_API_QUERY_KEY.GET(params?.variables);

  const query = useInfiniteQuery<ProductDTOType>(
    queryKey,
    ({ pageParam = '' }) =>
      productApi.getProductList(pageParam, params?.variables),
    {
      getNextPageParam: (lastPage, allPages) => {
        console.log('lastPage.cursor : ', lastPage.cursor);
        return lastPage.cursor;
      },
    },
  );

  // const query = useQuery(
  //   queryKey,
  //   () => productApi.getProductList(params?.variables),
  //   params?.options,
  // );

  return { ...query, queryKey };
}

export function useGetProductByIdQuery(
  params: QueryHookParams<typeof productApi.getProductById>,
) {
  const queryKey = PRODUCT_API_QUERY_KEY.GET_BY_ID(params?.variables);
  const query = useQuery(
    queryKey,
    () => productApi.getProductById(params?.variables),
    params?.options,
  );

  return { ...query, queryKey };
}

export const MYINFO_API_QUERY_KEY = {
  GET: (param: MyInfoParamGetType = '') => ['my-info', param],
  // GET_BY_ID: (id?: string) => ['product-by-id', id],
};

export function useGetMyInfoQuery(
  params?: QueryHookParams<typeof productApi.getMyInfo>,
) {
  const queryKey = MYINFO_API_QUERY_KEY.GET(params?.variables);
  const query = useQuery(
    queryKey,
    () => productApi.getMyInfo(),
    params?.options,
  );

  return { ...query, queryKey };
}

export const CART_API_QUERY_KEY = {
  GET: (param: CartParamGetType = '') => ['cart', param],
  // GET_BY_ID: (id?: string) => ['product-by-id', id],
};

export function useGetCartQuery(
  params?: QueryHookParams<typeof productApi.getCart>,
) {
  const queryKey = CART_API_QUERY_KEY.GET(params?.variables);
  const query = useQuery(
    queryKey,
    () => productApi.getCart(params?.variables),
    params?.options,
  );
  // if (query?.length == 0) {
  //   const form = new FormData();
  //   form.append('userId', String(params?.variables));

  // }

  return { ...query, queryKey };
}

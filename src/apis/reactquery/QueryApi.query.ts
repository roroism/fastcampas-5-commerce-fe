import { InfiniteQueryHookParams, QueryHookParams } from '@apis/type';

import {
  UseInfiniteQueryResult,
  UseQueryResult,
  useInfiniteQuery,
  useQueries,
  useQuery,
} from '@tanstack/react-query';

import productApi from './QueryApi';
import {
  CartParamGetType,
  GetOrderStatusDTOType,
  MyInfoParamGetType,
  OrderParamGetType,
  OrderStatusParamGetType,
  ProductDTOType,
  ProductDetailDTOType,
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

export function useGetProductByIdQueries(
  params: QueryHookParams<typeof productApi.getProductById>,
  productIdList?: Array<string> | undefined,
) {
  // const queryKey = PRODUCT_API_QUERY_KEY.GET_BY_ID(params?.variables);
  console.log('useGetProductByIdQueries params ::: ', params);
  const queryKeyList: any[] = [];

  const queryList =
    productIdList?.map((item) => {
      queryKeyList.push(PRODUCT_API_QUERY_KEY.GET_BY_ID(item));

      return {
        queryKey: PRODUCT_API_QUERY_KEY.GET_BY_ID(item),
        queryFn: () => productApi.getProductById(item),
        onSuccess: params?.options?.onSuccess,
      };
    }) || [];

  const query: UseQueryResult<ProductDetailDTOType>[] = useQueries({
    queries: [...queryList],
  });

  // const query: UseQueryResult[] = useQueries({
  //   queries: [
  //     {
  //       queryKey: PRODUCT_API_QUERY_KEY.GET_BY_ID(params?.variables),
  //       queryFn: () => productApi.getProductById(params?.variables),
  //       staleTime: Infinity,
  //     },
  //   ],
  // });

  //   persons.map((person) => {
  //     return {
  //         queryKey: ['person', person.id],
  //         queryFn: () => axios.get('http://localhost:8080/person', {
  //             params: {
  //                 id: person.id
  //             }
  //         })
  //     }
  // })

  return { query, queryKeyList };
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

export const ORDER_API_QUERY_KEY = {
  GET: (param: OrderParamGetType) => ['order', param],
  // GET_BY_ID: (id?: string) => ['product-by-id', id],
};

export function useGetOrderQuery(
  params: QueryHookParams<typeof productApi.getOrder>,
) {
  // console.log('params?.variables : ', params?.variables);
  const queryKey = ORDER_API_QUERY_KEY.GET(params?.variables as string);
  const query = useQuery(
    queryKey,
    () => productApi.getOrder(params?.variables),
    params?.options,
  );

  return { ...query, queryKey };
}

export const ORDER_BY_ORDERID_API_QUERY_KEY = {
  GET: (param: OrderParamGetType) => ['order-by-orderid', param],
  // GET_BY_ID: (id?: string) => ['product-by-id', id],
};

export function useGetOrderByOrderIdQuery(
  params: QueryHookParams<typeof productApi.getOrderByOrderId>,
) {
  // console.log('params?.variables : ', params?.variables);
  const queryKey = ORDER_BY_ORDERID_API_QUERY_KEY.GET(
    params?.variables as string,
  );
  const query = useQuery(
    queryKey,
    () => productApi.getOrderByOrderId(params?.variables),
    params?.options,
  );

  return { ...query, queryKey };
}

export const ORDER_STATUS_API_QUERY_KEY = {
  GET: (param: OrderStatusParamGetType) => ['order-status', param],
  GET_BY_ID: (id?: string) => ['order-status-by-id', id],
};

export function useGetOrderStatusQuery(
  params: InfiniteQueryHookParams<typeof productApi.getOrderStatus>,
) {
  // console.log('params?.variables : ', params?.variables);
  const queryKey = ORDER_STATUS_API_QUERY_KEY.GET(params?.variables as string);
  const query = useInfiniteQuery(
    queryKey,
    ({ pageParam = '1' }) =>
      productApi.getOrderStatus(pageParam, params?.variables),
    params?.options,
  );

  return { ...query, queryKey };
}

export function useGetProductByIdQueries2(
  params: QueryHookParams<typeof productApi.getProductById>,
  productIdList?: Array<{ productId: string; id: string }> | undefined,
  // productIdList?: Array<string> | undefined,
) {
  const queryKeyList: any[] = [];

  const queryList =
    productIdList?.map((item) => {
      queryKeyList.push(ORDER_STATUS_API_QUERY_KEY.GET_BY_ID(item.id));

      return {
        enabled: params.options?.enabled,
        onSuccess: params.options?.onSuccess,
        queryKey: ORDER_STATUS_API_QUERY_KEY.GET_BY_ID(item.id),
        queryFn: () => productApi.getProductById(item.productId),
      };
    }) || [];
  console.log('queryKeyList : ', queryKeyList);
  // const query: UseQueryResult<ProductDetailDTOType>[] = useQueries({
  const query: UseQueryResult<ProductDetailDTOType>[] = useQueries({
    queries: [...queryList],
  });

  return { query, queryKeyList };
}

import { AxiosError } from 'axios';

import { InfiniteQueryHookParams, QueryHookParams } from '@apis/type';

import { GetOrderStatusSelectType } from '@components/OrderHistoryPage/OrderHistoryPage';

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
  MyReviewParamGetType,
  OrderByOrderIdInfinityParamGetType,
  OrderByOrderIdParamGetType,
  OrderParamGetType,
  OrderStatusDTOType,
  OrderStatusInfinityParamGetType,
  OrderStatusParamGetType,
  ProductDTOType,
  ProductDetailDTOType,
  ProductParamGetType,
  ProductTagReviewParamGetType,
  getOrderStatusForSuccessPaymentParamGetType,
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
        // console.log('lastPage.cursor : ', lastPage.cursor);
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
  // console.log('useGetProductByIdQueries params ::: ', params);
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
  GET: (param: OrderParamGetType) => ['order', param.offset],
  // GET_BY_ID: (id?: string) => ['product-by-id', id],
};

export function useGetOrderQuery(
  params: QueryHookParams<typeof productApi.getOrder>,
) {
  // console.log('params?.variables : ', params?.variables);
  const queryKey = ORDER_API_QUERY_KEY.GET(
    params?.variables as OrderParamGetType,
  );
  const query = useQuery(
    queryKey,
    () => productApi.getOrder(params?.variables),
    params?.options,
  );

  return { ...query, queryKey };
}

export const ORDER_BY_ORDERID_API_QUERY_KEY = {
  GET: (param: OrderByOrderIdParamGetType) => ['order-by-orderid', param],
  GET_INFINITE: (param: OrderByOrderIdInfinityParamGetType) => [
    'order-by-orderid-infinite',
    param,
  ],
};

export function useGetOrderByOrderIdQuery(
  params: QueryHookParams<typeof productApi.getOrderByOrderId>,
) {
  // console.log('params?.variables : ', params?.variables);
  const queryKey = ORDER_BY_ORDERID_API_QUERY_KEY.GET(
    params?.variables as string,
  );
  // console.log('useGetOrderByOrderIdQuery params : ', params);
  const query = useQuery(
    queryKey,
    () => productApi.getOrderByOrderId(params?.variables),
    params?.options,
  );

  return { ...query, queryKey };
}

export function useGetOrderByOrderIdQueries(
  params: QueryHookParams<typeof productApi.getProductById>,
  productIdList?: Array<string> | undefined,
) {
  const queryKeyList: any[] = [];

  const queryList =
    productIdList?.map((orderId) => {
      queryKeyList.push(ORDER_BY_ORDERID_API_QUERY_KEY.GET(orderId));

      return {
        enabled: params.options?.enabled,
        onSuccess: params.options?.onSuccess,
        queryKey: ORDER_BY_ORDERID_API_QUERY_KEY.GET(orderId),
        queryFn: () => productApi.getOrderByOrderId(orderId),
      };
    }) || [];
  // console.log('queryKeyList : ', queryKeyList);
  // const query: UseQueryResult<ProductDetailDTOType>[] = useQueries({
  const query: UseQueryResult<ProductDetailDTOType>[] = useQueries({
    queries: [...queryList],
  });

  return { query, queryKeyList };
}

export const ORDER_STATUS_API_QUERY_KEY = {
  GET_INFINITE: (param: OrderStatusInfinityParamGetType) => [
    'order-status-infinite',
    param,
  ],
  GET: (param: OrderStatusParamGetType) => ['order-status', param],
  GET_BY_ID: (id?: string) => ['order-status-by-id', id],
};

export function useGetOrderStatusInfiniteQuery(
  params: InfiniteQueryHookParams<typeof productApi.getOrderStatus>,
) {
  // console.log('params?.variables : ', params?.variables);
  const queryKey = ORDER_STATUS_API_QUERY_KEY.GET_INFINITE(
    params?.variables as string,
  );
  const query = useInfiniteQuery(
    queryKey,
    ({ pageParam = '2' }) =>
      productApi.getOrderStatus(pageParam, params?.variables),
    params?.options,
  );

  return { ...query, queryKey };
}

export function useGetOrderStatusQuery(
  params: QueryHookParams<typeof productApi.getOrderStatus>,
  page = '1',
) {
  // console.log('params?.variables : ', params?.variables);
  const queryKey = ORDER_STATUS_API_QUERY_KEY.GET(page as string);
  const query = useQuery(
    queryKey,
    () => productApi.getOrderStatus(page, params?.variables),
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
      queryKeyList.push(PRODUCT_API_QUERY_KEY.GET_BY_ID(item.id));

      return {
        enabled: params.options?.enabled,
        onSuccess: params.options?.onSuccess,
        queryKey: PRODUCT_API_QUERY_KEY.GET_BY_ID(item.id),
        queryFn: () => productApi.getProductById(item.productId),
      };
    }) || [];
  // console.log('queryKeyList : ', queryKeyList);
  // const query: UseQueryResult<ProductDetailDTOType>[] = useQueries({
  const query: UseQueryResult<ProductDetailDTOType>[] = useQueries({
    queries: [...queryList],
  });

  return { query, queryKeyList };
}

export function useGetProductByIdQueries3(
  params: any,
  productIdList: Array<{ productId: string; id: string }> | undefined, // id : orderitem id
  // productIdList?: Array<string> | undefined,
) {
  const queryKeyList: any[] = [];
  console.log('productIdList :: ', productIdList);

  const queryList =
    productIdList?.map((item) => {
      queryKeyList.push(PRODUCT_API_QUERY_KEY.GET_BY_ID(item.productId));

      return {
        enabled: params.options?.enabled,
        select: params.options?.select,
        onSuccess: params.options?.onSuccess,
        queryKey: PRODUCT_API_QUERY_KEY.GET_BY_ID(item.productId),
        queryFn: () => productApi.getProductById(item.productId),
      };
    }) || [];
  // console.log('queryKeyList Queries3 : ', queryKeyList);
  // const query: UseQueryResult<ProductDetailDTOType>[] = useQueries({
  const query: any = useQueries({
    queries: [...queryList],
  });

  return { query, queryKeyList };
}

export const SUCCESS_PAYMENT_PRODUCTS_API_QUERY_KEY = {
  GET: (param: getOrderStatusForSuccessPaymentParamGetType) => [
    'success-payment-products',
    param,
  ],
};

export function useGetSuccessPaymentProductsQuery(
  // params: QueryHookParams<typeof productApi.getOrderStatusForSuccessPayment>,
  params: any,
) {
  const queryKey = SUCCESS_PAYMENT_PRODUCTS_API_QUERY_KEY.GET(
    params?.variables as string,
  );
  const query = useQuery<
    GetOrderStatusDTOType,
    AxiosError,
    OrderStatusDTOType[]
  >(
    queryKey,
    () => productApi.getOrderStatusForSuccessPayment(params?.variables),
    params?.options,
  );

  return { ...query, queryKey };
}

export const MY_REVIEW_API_QUERY_KEY = {
  GET: (param: MyReviewParamGetType) => ['my-review', param.page],
};

export function useGetMyReviewQuery(
  params: QueryHookParams<typeof productApi.getReview>,
) {
  // console.log('params?.variables : ', params?.variables);
  const queryKey = MY_REVIEW_API_QUERY_KEY.GET(
    params?.variables as MyReviewParamGetType,
  );
  const query = useQuery(
    queryKey,
    () => productApi.getReview(params?.variables),
    params?.options,
  );

  return { ...query, queryKey };
}

export const PRODUCT_TAG_REVIEW_API_QUERY_KEY = {
  GET: (param: ProductTagReviewParamGetType) => [
    'product-tag-review',
    param.tagId,
  ],
};

export function useGetProductTagReviewQuery(
  params: QueryHookParams<typeof productApi.getProductTagReview>,
) {
  // console.log('params?.variables : ', params?.variables);
  const queryKey = PRODUCT_TAG_REVIEW_API_QUERY_KEY.GET(
    params?.variables as ProductTagReviewParamGetType,
  );
  const query = useQuery(
    queryKey,
    () => productApi.getProductTagReview(params?.variables),
    params?.options,
  );

  return { ...query, queryKey };
}

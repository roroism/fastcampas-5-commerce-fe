import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import { TAG_LIMIT, TAG_OFFSET } from '@components/MainPage/MainPage';
import { MY_REVIEW_PAGE_SIZE } from '@components/MyReviewPage/MyReviewPage';
import { PAGE_SIZE_LIMIT } from '@components/OrderHistory2Page/OrderHistory2Page';
import { PAGE_SIZE } from '@components/OrderHistoryPage/OrderHistoryPage';

import {
  CartDTOType,
  CartItemDTOType,
  CartParamGetType,
  ExampleDTOType,
  ExampleParamPatchType,
  ExampleParamPutType,
  GetMyReviewDTOType,
  GetOrderDTOType,
  GetOrderStatusDTOType,
  GetProductTagReviewDTOType,
  IOrderForm,
  MyInfoDTOType,
  MyInfoParamGetType,
  MyInfoParamPatchType,
  MyReviewParamGetType,
  OrderByOrderIdDTOType,
  OrderByOrderIdParamGetType,
  OrderDTOType,
  OrderParamGetType,
  OrderParamPatchType,
  OrderStatusDTOType,
  OrderStatusParamGetType,
  OrderStatusParamPatchType,
  OrderStatusParamPostType,
  PatchOrderStatusDTOType,
  ProductDTOType,
  ProductDetailDTOType,
  ProductInCartItemDTOType,
  ProductInCartItemParamPutType,
  ProductParamGetType,
  ProductTagReviewParamGetType,
  ReviewDTOType,
  ReviewParamPostType,
  getOrderStatusForSuccessPaymentParamGetType,
  putOrderByOrderIdParamPutType,
} from './QueryApi.type';

export class ProductApi {
  axios: AxiosInstance = instance;
  page_size = 2;

  constructor(axios?: AxiosInstance) {
    if (axios) this.axios = axios;
  }

  getProductList = async (
    cursor: string,
    params?: ProductParamGetType,
  ): Promise<ProductDTOType> => {
    console.log('getProductList - cursor : ', cursor);
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/product/?cursor=${cursor}&page_size=${this.page_size}`,
      params,
    });
    console.log('getProductList - data : ', data);
    return data;
  };

  getProductById = async (id: string): Promise<ProductDetailDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/product/${id}/`,
    });
    return data;
  };

  getMyInfo = async (params?: MyInfoParamGetType): Promise<MyInfoDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/user/me/`,
      params,
    });
    console.log('getMyInfo - data : ', data);
    return data;
  };

  // patchMyInfo = async (req: MyInfoParamPatchType): Promise<MyInfoDTOType> => {
  patchMyInfo = async (req: MyInfoParamPatchType): Promise<any> => {
    // console.log('...req.data, : ', { ...req.data });

    await this.axios.put(`/v1/user/me/`, req.data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // const data = await this.axios({
    //   method: 'PATCH',
    //   url: `/v1/user/me/`,
    //   data: { ...req.data },
    // });

    // const data = instance
    //   .patch(
    //     `/v1/user/me/`,
    //     {
    //       ...req.data,
    //     },
    //     {
    //       // headers: {
    //       //   'Access-Control-Allow-Methods':
    //       //     'GET, POST, PUT, DELETE, OPTIONS, PATCH',
    //       // },
    //     },
    //   )
    //   .then((res) => {
    //     console.log('patchMyInfo res : ', res);
    //   });

    // const { data } = await this.axios({
    //   method: 'PATCH',
    //   url: `/v1/user/me/`,
    //   data: req.data,
    // });
    // return data;
    // return data;
  };

  getCart = async (params?: CartParamGetType): Promise<CartDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/cart/?user_id=${params}`,
      // params,
    });
    console.log('getCart - data : ', data);
    return data;
  };

  postCart = async (body: FormData): Promise<CartDTOType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/v1/cart/`,
      data: body,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  };

  postCartItem = async (body: FormData): Promise<CartItemDTOType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/v1/cart/item/`,
      data: body,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  };

  putProductInCartItem = async (
    req: ProductInCartItemParamPutType,
  ): Promise<ProductInCartItemDTOType> => {
    console.log('putProductInCartItem req : ', req);
    const { data } = await this.axios({
      method: 'PUT',
      url: `/v1/cart/item/${req.id}/`,
      data: req.data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  };

  deleteCartItem = async (id: string): Promise<boolean> => {
    const { data } = await this.axios({
      method: 'DELETE',
      url: `/v1/cart/item/${id}/`,
    });
    return data;
  };

  postOrder = async (body: FormData): Promise<OrderDTOType> => {
    // postOrder = async (body: IOrderForm): Promise<OrderDTOType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/v1/order/`,
      data: body,
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    // const { data } = await this.axios.put(`v1/order/`, { ...body });

    return data;
  };

  getOrder = async (params?: OrderParamGetType): Promise<GetOrderDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/order/?user_id=${params?.userId}&limit=${PAGE_SIZE_LIMIT}&offset=${params?.offset}`,
      // params,
    });
    console.log('order - data : ', data);
    return data;
  };

  patchOrder = async (req: OrderParamPatchType): Promise<OrderDTOType> => {
    console.log('patchOrderStatus req : ', req);
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/v1/order/${req.orderId}/`, //order id(uuid)
      data: req.data,
    });
    return data;
  };

  getOrderByOrderId = async (
    params?: OrderByOrderIdParamGetType,
  ): Promise<OrderByOrderIdDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/order/${params}/`,
      // params,
    });
    // console.log('order - data : ', data);
    return data;
  };

  putOrderByOrderId = async (
    req: putOrderByOrderIdParamPutType,
  ): Promise<OrderByOrderIdDTOType> => {
    console.log('putProductInCartItem req : ', req);
    const { data } = await this.axios({
      method: 'PUT',
      url: `/v1/order/${req.id}/`,
      data: req.data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  };

  postOrderStatus = async (
    // body: OrderStatusParamPostType,
    body: FormData,
  ): Promise<OrderStatusDTOType> => {
    // postOrder = async (body: IOrderForm): Promise<OrderDTOType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/v1/order/status/`,
      data: body,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  };

  getOrderStatus = async (
    pageParam: string,
    params?: OrderStatusParamGetType,
  ): Promise<GetOrderStatusDTOType> => {
    // postOrder = async (body: IOrderForm): Promise<OrderDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      // url: `/v1/order/status/?user_id=${params}&page_size=${}&page=${}`,
      url: `/v1/order/status/?user_id=${params}&page=${pageParam}&page_size=${PAGE_SIZE}`,
      // headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  };

  getOrderStatusForSuccessPayment = async (
    params?: getOrderStatusForSuccessPaymentParamGetType,
  ): Promise<GetOrderStatusDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/order/status/?user_id=${params}&page=1&page_size=50`,
    });
    return data;
  };

  patchOrderStatus = async (
    req: OrderStatusParamPatchType,
  ): Promise<OrderStatusDTOType> => {
    console.log('patchOrderStatus req : ', req);
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/v1/order/status/${req.id}/`, //status id
      data: req.data,
      // headers: { 'Content-Type': 'multipart/form-data' },
    });
    // const { data } = await this.axios.patch(
    //   `/v1/order/status/${req.orderId}/`,
    //   req.data,
    // );

    return data;
  };

  postReview = async (req: ReviewParamPostType): Promise<ReviewDTOType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/v1/review/`,
      data: req,
      // headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  };

  getReview = async (
    params?: MyReviewParamGetType,
  ): Promise<GetMyReviewDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/review/?user_id=${params?.id}&page=${params?.page}&page_size=${MY_REVIEW_PAGE_SIZE}`,
    });
    return data;
  };

  getProductTagReview = async (
    params?: ProductTagReviewParamGetType,
  ): Promise<GetProductTagReviewDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/product/tag/?tag_id=${params?.tagId}&offset=${TAG_OFFSET}&limit=${TAG_LIMIT}`,
    });
    return data;
  };

  // patchProductInCartItem = async (
  //   req: ProductInCartItemParamPatchType,
  // ): Promise<ProductInCartItemDTOType> => {
  //   console.log('patchProductInCartItem req : ', req);
  //   const { data } = await this.axios({
  //     method: 'PUT',
  //     url: `/v1/cart/item/${req.id}/`,
  //     data: req.data,
  //     headers: { 'Content-Type': 'multipart/form-data' },
  //   });
  //   return data;
  // };

  // postExample = async (body: ProductDTOType): Promise<ExampleDTOType> => {
  //   const { data } = await this.axios({
  //     method: 'POST',
  //     url: `/v1/example`,
  //     data: body,
  //   });
  //   return data;
  // };

  // putExample = async (req: ExampleParamPutType): Promise<ExampleDTOType> => {
  //   const { data } = await this.axios({
  //     method: 'PUT',
  //     url: `/v1/example/${req.id}`,
  //     data: req.data,
  //   });
  //   return data;
  // };
  // patchExample = async (
  //   req: ExampleParamPatchType,
  // ): Promise<ExampleDTOType> => {
  //   const { data } = await this.axios({
  //     method: 'PATCH',
  //     url: `/v1/example/${req.id}`,
  //     data: req.data,
  //   });
  //   return data;
  // };

  // deleteExample = async (id: string): Promise<boolean> => {
  //   const { data } = await this.axios({
  //     method: 'DELETE',
  //     url: `/v1/example/${id}`,
  //   });
  //   return data;
  // };
}

const productApi = new ProductApi();

export default productApi;

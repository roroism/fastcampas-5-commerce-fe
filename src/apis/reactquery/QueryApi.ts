import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import {
  ExampleDTOType,
  ExampleParamPatchType,
  ExampleParamPutType,
  MyInfoDTOType,
  MyInfoParamGetType,
  MyInfoParamPatchType,
  ProductDTOType,
  ProductDetailDTOType,
  ProductParamGetType,
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
    console.log('...req.data, : ', { ...req.data });

    const data = await this.axios({
      method: 'PATCH',
      url: `/v1/user/me/`,
      data: { ...req.data },
    });

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
    return data;
  };

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

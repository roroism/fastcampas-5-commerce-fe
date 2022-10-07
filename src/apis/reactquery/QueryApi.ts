import { AxiosInstance } from 'axios';

import instance from '@apis/_axios/instance';

import {
  ExampleDTOType,
  ExampleParamPatchType,
  ExampleParamPutType,
  ProductDTOType,
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

  getProductById = async (id: string): Promise<ProductDTOType> => {
    const { data } = await this.axios({
      method: 'GET',
      url: `/v1/product/${id}`,
    });
    return data;
  };

  postExample = async (body: ProductDTOType): Promise<ExampleDTOType> => {
    const { data } = await this.axios({
      method: 'POST',
      url: `/v1/example`,
      data: body,
    });
    return data;
  };

  putExample = async (req: ExampleParamPutType): Promise<ExampleDTOType> => {
    const { data } = await this.axios({
      method: 'PUT',
      url: `/v1/example/${req.id}`,
      data: req.data,
    });
    return data;
  };
  patchExample = async (
    req: ExampleParamPatchType,
  ): Promise<ExampleDTOType> => {
    const { data } = await this.axios({
      method: 'PATCH',
      url: `/v1/example/${req.id}`,
      data: req.data,
    });
    return data;
  };

  deleteExample = async (id: string): Promise<boolean> => {
    const { data } = await this.axios({
      method: 'DELETE',
      url: `/v1/example/${id}`,
    });
    return data;
  };
}

const productApi = new ProductApi();

export default productApi;

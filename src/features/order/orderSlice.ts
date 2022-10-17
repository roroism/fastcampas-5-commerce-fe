import {
  CartItemDTOType,
  ProductDetailDTOType,
} from '@apis/reactquery/QueryApi.type';

import { PaymentProductType } from '@components/OrderPage/types';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface OrderStateType {
  value: CartItemDTOType[];
  paymentList: PaymentProductType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: OrderStateType = {
  value: [],
  paymentList: [],
  status: 'idle',
};

export const orderSlice = createSlice({
  name: 'ORDER',
  initialState,
  reducers: {
    productInCart: (
      state,
      action: PayloadAction<CartItemDTOType[]> | undefined,
    ) => {
      state.value = action?.payload || [];
    },
    addProductInCart: (state, action) => {
      state.value = [...state.value, action.payload];
    },
    deleteProductInCart: (state, action) => {
      state.value = state.value.filter(
        (el: CartItemDTOType) => el.id !== action.payload,
      );
    },
    deleteAllProductInCart: (state) => {
      state.value = [];
    },
    editCountProductInCart: (state, action) => {
      const findedIdx = state.value.findIndex(
        (item) => item.id === action.payload.id,
      );

      const olditem = state.value[findedIdx];
      const count = action.payload.count;
      const newitem = { ...olditem, count: count };
      state.value[findedIdx] = newitem;
    },
    // addPaymentProductList: (state, action) => {
    //   state.paymentList = state.value.map((item) => {
    //     const findedProduct = action.payload.find(
    //       (product: any) => product?.data?.id === item.productId,
    //     );
    //     return {
    //       ...item,
    //       name: findedProduct?.name,
    //       capacity: findedProduct?.capacity,
    //       photo: findedProduct?.photo,
    //       price: findedProduct?.price,
    //     };
    //   });
    // },
    addPaymentProduct: (state, action) => {
      if (
        state.paymentList.some((item) => item.productId === action.payload.id)
      )
        return;

      if (state.value.length !== 0) {
        const findedIdx = state.value.findIndex(
          (product: any) => product.productId === action?.payload?.id,
        );
        state.paymentList.push({
          id: state.value[findedIdx].id,
          productId: state.value[findedIdx].productId,
          cartId: state.value[findedIdx].cartId,
          count: state.value[findedIdx].count,
          name: action?.payload?.name,
          capacity: action?.payload?.capacity,
          photo: action?.payload?.photo,
          price: action?.payload?.price,
        });
      }
    },
    deletePaymentProduct: (state) => {
      state.paymentList = [];
    },
  },
});

export const {
  actions: orderSliceAction, //
  reducer: orderSliceReducer,
} = orderSlice;

export default orderSlice;

import { CartItemDTOType } from '@apis/reactquery/QueryApi.type';

import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface OrderStateType {
  value: CartItemDTOType[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: OrderStateType = {
  value: [],
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
  },
});

export const {
  actions: orderSliceAction, //
  reducer: orderSliceReducer,
} = orderSlice;

export default orderSlice;

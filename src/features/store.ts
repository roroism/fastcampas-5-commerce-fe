import { configureStore } from '@reduxjs/toolkit';

import modalSlice from './modal/modalSlice';
import orderSlice from './order/orderSlice';
import userSlice from './user/userSlice';

export function makeStore() {
  return configureStore({
    reducer: {
      [orderSlice.name]: orderSlice.reducer,
      [userSlice.name]: userSlice.reducer,
      [modalSlice.name]: modalSlice.reducer,
    },
  });
}

const store = makeStore();

export default store;

export type FormOrderDataType = {
  userId: string;
  userName: string;
  userPhone: string;
  userAddr: string;
  userAddrDetail: string;
  shipName: string;
  shipPhone: string;
  shipAddr: string;
  shipAddrDetail: string;
  orderMessage: string;
  method: 'CARD';
  price: string;
};

export type PaymentProductType = {
  id: number;
  productId: number;
  cartId: number;
  count: number;
  name: string;
  capacity: number;
  photo: string;
  price: number;
};

// export type OrderType = {
//   name?: string;
//   phone?: string;
//   address?: string;
//   addressDetail?: string;
//   shippingRequest?: string;
// };

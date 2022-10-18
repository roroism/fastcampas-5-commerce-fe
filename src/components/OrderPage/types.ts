export enum PaymentMethod {
  CARD = 'CARD',
}

export type FormOrderDataType = {
  userId: string;
  userName: string;
  userPhone: string;
  userAddrPost: string;
  userAddrDetail: string;
  shipName: string;
  shipPhone: string;
  shipAddrPost: string;
  shipAddrDetail: string;
  orderMessage: string;
  method: PaymentMethod;
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

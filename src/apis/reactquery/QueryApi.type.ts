import { Ireview } from '@components/ProductsPage/_fragments/ReviewItem';

export type gender = 'male' | 'female';

export type ProductDTOType = {
  // next: 'string';
  // previous: 'string';
  cursor: string;
  results: Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    capacity: number;
    thumbnail: string;
    tags: Array<{ id: number; name: string }>;
    avgRate: number | null;
    reviewCount: number;
  }>;
};

export type ProductDetailDTOType = {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  detail: string;
  photo: string;
  reviewList: Array<Ireview>;
  avgRate: number;
  reviewCount: number;
};

export type MyInfoDTOType = {
  id?: number;
  name: string;
  nickname: string;
  phone: string;
  address: string;
  email: string;
  profile?: string;
  gender?: gender;
  age?: number;
};
export type MyInfoParamPatchType = {
  id?: string;
  // data: Partial<MyInfoDTOType>;
  data: FormData;
};

export interface Icartitem {
  id: number;
  productId: number;
  cartId: number;
  count: number;
}

export type CartDTOType = Array<{
  cartitem: Array<Icartitem>;
  id: number;
  userId: number;
}>;

export type CartItemDTOType = {
  id: number;
  productId: number;
  cartId: number;
  count: number;
};

export interface IPostCartItemRequestBody {
  productId: number;
  cartId: number;
  count: number;
}

export type ProductInCartItemDTOType = {
  count: number;
};

export enum PaymentStatus {
  READY = 'READY',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_FOR_DEPOSIT = 'WAITING_FOR_DEPOSIT',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
  PARTIAL_CANCELED = 'PARTIAL_CANCELED',
  ABORTED = 'ABORTED',
  EXPIRED = 'EXPIRED',
}

export type OrderDTOType = {
  id: number;
  userId: number;
  price: number;
  shippingPrice: number;
  amount: number;
  method: string;
  status: PaymentStatus;
  userName: string;
  userPhone: string;
  userAddrPost: string;
  userAddrDetail: string;
  shipName: string;
  shipPhone: string;
  shipAddrPost: string;
  shipAddrDetail: string;
  orderMessage: string;
  created: Date;
};

export type IOrderForm = {
  userId: number;
  price: number;
  paymentKey?: string | null;
  method: 'CARD';
  userName: string;
  userPhone: string;
  userAddrPost: string;
  userAddrDetail: string;
  shipName: string;
  shipPhone: string;
  shipAddrPost: string;
  shipAddrDetail: string;
  orderMessage: string;
};

export type OrderByOrderIdDTOType = {
  id: number;
  price: number;
  userId: number;
  shippingPrice: number;
  amount: number;
  method: string;
  status: PaymentStatus;
  userName: string;
  userPhone: string;
  userAddrPost: string;
  userAddrDetail: string;
  shipName: string;
  shipPhone: string;
  shipAddrPost: string;
  shipAddrDetail: string;
  orderMessage: string;
  created: Date;
};

// export type CartDTOType = [
//   {
//     cartitem: Array<Icartitem>;
//     id: number;
//     userId: number;
//   },
// ];

export enum ShippingStatus {
  PAID = 'PAID',
  WAIT = 'WAIT',
  INPROGRESS = 'INPROGRESS',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
}

export type OrderStatusDTOType = {
  id: number;
  orderId: string;
  productId: number;
  count: number;
  shippingStatus: ShippingStatus;
  created: string;
};

export type CartParamGetType = {};

export type CartParamPostType = {};

export type CartItemParamPostType = {};

export type ProductInCartItemParamPutType = {
  id: number;
  data: FormData;
};

export type OrderByOrderIdParamGetType = {};

// export type ProductInCartItemParamPatchType = {
//   id: number;
//   data: FormData;
// };

export type ExampleDTOType = {};
export type ProductParamGetType = {};
export type MyInfoParamGetType = {};
export type OrderParamGetType = {};
export type OrderStatusParamGetType = {};
export type getOrderStatusForSuccessPaymentParamGetType = {};

export type putOrderByOrderIdParamPutType = {
  id: string;
  data: FormData;
};

export type OrderStatusParamPostType = {
  id: number;
  data: FormData;
};

export type GetOrderStatusDTOType = {
  count: number;
  next: string;
  previous: string;
  results: OrderStatusDTOType[];
};

export type ExampleParamPutType = {
  id: string;
  data: ProductDTOType;
};
export type ExampleParamPatchType = {
  id: string;
  data: Partial<ProductDTOType>;
};

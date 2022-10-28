import { Ireview } from '@components/ProductsPage/_fragments/ReviewItem';

export type gender = 'male' | 'female';

export enum Tag {
  올인원 = '올인원', // id: 1
  클렌저 = '클렌저', // id: 2
  마일드 = '마일드', // id: 3
  오일 = '오일', // id: 4
  로션 = '로션', // id: 5
  크림 = '크림', // id: 6
  파우더로션 = '파우더로션', // id: 7
  바스앤샴푸 = '바스앤샴푸', // id: 8
}

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
    tag: Array<{ id: number; name: Tag }>;
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

export type ReviewReplyDTOType = {
  id: number; // reply id
  replyUserNickname: string;
  content: string;
  created: Date;
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
  id: string;
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
  id: string;
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
  PAID = 'PAID', // 결제완료
  WAIT = 'WAIT', // 상품준비중
  INPROGRESS = 'INPROGRESS', // 배송중
  DONE = 'DONE', // 배송완료
  CANCELED = 'CANCELED', // 결제취소
}

export type OrderStatusDTOType = {
  id: number;
  orderId: string;
  productId: number;
  count: number;
  shippingStatus: ShippingStatus;
  created: string;
};

export type ReviewDTOType = {
  id: number;
  userId: number;
  nickname: string;
  productId: number;
  orderItemId: number;
  rate: number;
  content: string;
  reviewimageSet: Array<{
    reviewId: number;
    url: string;
  }>;
  created: Date;
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
export type OrderStatusInfinityParamGetType = {};
export type OrderByOrderIdInfinityParamGetType = {};
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
  productIdList?: { productId: string; id: string; orderId: string }[];
};

export type OrderStatusParamPatchType = {
  id: string;
  // data: FormData;
  data: { shippingStatus: ShippingStatus };
};

export type ReviewParamPostType = {
  userId: number;
  productId: number;
  orderItemId: number;
  rate: number;
  content: string;
  reviewimagePath?: Array<string | undefined> | undefined;
};

export type PatchOrderStatusDTOType = {};

export type MyReviewParamGetType = {
  id: number;
  page: number;
};

export type myReviewType = {
  id: number;
  userId: number;
  nickname: string;
  productId: number;
  orderItemId: number;
  rate: number;
  content: string;
  reviewimageSet: Array<{
    reviewId: number;
    url: string;
  }>;
  created: string;
};

export type GetMyReviewDTOType = {
  count: number;
  next: string;
  previous: string;
  results: Array<myReviewType>;
};

export type ExampleParamPutType = {
  id: string;
  data: ProductDTOType;
};
export type ExampleParamPatchType = {
  id: string;
  data: Partial<ProductDTOType>;
};

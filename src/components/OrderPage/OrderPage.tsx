import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { result } from 'lodash';

import { ChakraProps } from '@chakra-ui/react';

import productApi from '@apis/reactquery/QueryApi';
import {
  usePostOrderMutation,
  usePostOrderStatusMutation,
} from '@apis/reactquery/QueryApi.mutation';
import {
  CART_API_QUERY_KEY,
  useGetMyInfoQuery,
  useGetOrderQuery,
  useGetProductByIdQueries,
} from '@apis/reactquery/QueryApi.query';
import { OrderDTOType } from '@apis/reactquery/QueryApi.type';
import { orderSliceAction } from '@features/order/orderSlice';
import useAppStore from '@features/useAppStore';

import { useQueryClient } from '@tanstack/react-query';
import { loadTossPayments } from '@tosspayments/payment-sdk';

import customUseFormforOrder from './CustomUseFormForOrder';
import OrderPageView from './OrderPage.view';
import usePostcode from './_fragments/usePostCode';
import { PaymentProductType } from './types';

const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

interface OrderPageProps extends ChakraProps {}

function OrderPage({ ...basisProps }: OrderPageProps) {
  // const [postOrderResult, setPostOrderResult] = useState<OrderDTOType>();
  const queryClient = useQueryClient();
  const formData = customUseFormforOrder();
  const { handleSubmit } = formData;
  const { data: userData } = useGetMyInfoQuery();
  // const { mutate: postOrderMutate } = usePostOrderMutation({
  //   options: {
  //     onSuccess: (data, variables, context) => {
  //       queryClient.invalidateQueries(CART_API_QUERY_KEY.GET());
  //       setPostOrderResult(data);
  //     },
  //   },
  // });
  // const { mutate: postOrderStatusMutate } = usePostOrderStatusMutation();

  // const { data: orderIdData } = useGetOrderQuery({
  //   variables: userData?.id?.toString(),
  // });
  // console.log('orderIdData :: ', orderIdData);
  const { value: checkItems } = useAppStore((state) => state.ORDER);
  const { paymentList: paymentList } = useAppStore((state) => state.ORDER);
  const dispatch = useDispatch();
  console.log('checkItems ::: ', checkItems);
  // const [paymentItems, setPaymentItems] = useState([]);
  // const { query: productData } = useGetProductByIdQueries(
  //   {
  //     options: {
  //       onSuccess: (data) => {
  //         console.log('useGetProductByIdQueries data : ', data);
  //         dispatch(orderSliceAction.addPaymentProduct(data));
  //       },
  //     },
  //     variables: '',
  //   },
  //   checkItems.map((item) => item.productId.toString()),
  // );

  useEffect(() => {
    return () => {
      dispatch(orderSliceAction.deletePaymentProduct());
    };
  }, []);

  const searchPostcode1 = usePostcode();
  const searchPostcode2 = usePostcode();

  const onSubmit = handleSubmit((data) => {
    console.log('submit success ::: ', data);

    const form = new FormData();
    form.append('userId', data.userId);
    form.append('price', data.price);
    // form.append('paymentKey', '');
    form.append('method', data.method);
    form.append('userName', data.userName);
    form.append('userPhone', data.userPhone.replace(/-/g, ''));
    form.append('userAddr', data.userAddr);
    form.append('userAddrPost', data.userAddrPost);
    form.append('userAddrDetail', data.userAddrDetail);
    form.append('shipName', data.shipName);
    form.append('shipPhone', data.shipPhone.replace(/-/g, ''));
    form.append('shipAddr', data.shipAddr);
    form.append('shipAddrPost', data.shipAddrPost);
    form.append('shipAddrDetail', data.shipAddrDetail);
    form.append('orderMessage', data.orderMessage);
    // postOrderMutate(form);
    productApi.postOrder(form).then((res) => {
      console.log('productApi.postOrder res : ', res);

      // if (orderIdData) {
      //   paymentList.forEach((item) => {
      //     const statusForm = new FormData();
      //     form.append('orderId', orderIdData[0].id.toString());
      //     form.append('productId', item.productId.toString());
      //     form.append('count', item.count.toString());
      //     postOrderStatusMutate({ id: Number(data.userId), data: statusForm });
      //   });
      // }

      if (res) {
        console.log('paymentList ::: ', paymentList);
        // console.log('data.userId ::: ', data.userId);
        paymentList.forEach((item) => {
          const statusForm = new FormData();
          statusForm.append('orderId', res.id.toString());
          statusForm.append('productId', item.productId.toString());
          statusForm.append('count', item.count.toString());
          // postOrderStatusMutate({ id: Number(data.userId), data: statusForm });
          productApi.postOrderStatus(statusForm);
        });
      }

      //     // async/await을 사용하는 경우
      // async function main() {
      //   const tossPayments = await loadTossPayments(clientKey)
      // }
      // console.log(
      //   'successUrl : ',
      //   `${process.env.NEXT_PUBLIC_API_DOMAIN}/order/redirect/success`,
      // );
      // if (orderIdData) {
      //   console.log('toss  :::  ', {
      //     amount: Number(data.price),
      //     orderId: orderIdData[0]?.id.toString(),
      //     orderName: `${paymentList[0].name} 외 ${paymentList.length}건`,
      //     customerName: data.userName,
      //     successUrl: `${process.env.NEXT_PUBLIC_API_DOMAIN}/order/redirect/success`,
      //     failUrl: `${process.env.NEXT_PUBLIC_API_DOMAIN}/order/redirect/fail`,
      //   });
      // }

      //Promise를 사용하는 경우
      if (res) {
        loadTossPayments(clientKey).then((tossPayments) => {
          // ...
          tossPayments.requestPayment('카드', {
            // 결제 수단 파라미터
            // 결제 정보 파라미터
            // amount: Number(data.price), // 잘못된 값
            amount: res.amount,
            orderId: res.id.toString(),
            // orderId: 'fXGzPmxWQFsyY1X67KrjS',
            orderName: `${paymentList[0].name} 외 ${paymentList.length}건`,
            customerName: data.userName,
            successUrl: `${process.env.NEXT_PUBLIC_PAYMENT_CALLBACK_BASE_DOMAIN}/order/redirect/success`,
            failUrl: `${process.env.NEXT_PUBLIC_PAYMENT_CALLBACK_BASE_DOMAIN}/order/redirect/fail`,
          });
        });
      }
    });
  });

  return (
    <OrderPageView
      formData={formData}
      onSubmit={onSubmit}
      useOrderPostcode={searchPostcode1}
      useShippingPostcode={searchPostcode2}
      paymentList={paymentList}
    />
  );
}

export default OrderPage;

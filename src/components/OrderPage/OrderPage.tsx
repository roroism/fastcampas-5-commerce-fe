import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { ChakraProps } from '@chakra-ui/react';

import { useGetProductByIdQueries } from '@apis/reactquery/QueryApi.query';
import { orderSliceAction } from '@features/order/orderSlice';
import useAppStore from '@features/useAppStore';

import { loadTossPayments } from '@tosspayments/payment-sdk';

import customUseFormforOrder from './CustomUseFormForOrder';
import OrderPageView from './OrderPage.view';
import usePostcode from './_fragments/usePostCode';
import { PaymentProductType } from './types';

const clientKey = 'test_ck_D5GePWvyJnrK0W0k6q8gLzN97Eoq';

interface OrderPageProps extends ChakraProps {}

function OrderPage({ ...basisProps }: OrderPageProps) {
  const formData = customUseFormforOrder();
  const { handleSubmit } = formData;

  const { value: checkItems } = useAppStore((state) => state.ORDER);
  const { paymentList: paymentList } = useAppStore((state) => state.ORDER);
  const dispatch = useDispatch();
  console.log('checkItems ::: ', checkItems);
  const [paymentItems, setPaymentItems] = useState([]);
  const { query: productData } = useGetProductByIdQueries(
    {
      options: {
        onSuccess: (data) => {
          console.log('useGetProductByIdQueries data : ', data);
          dispatch(orderSliceAction.addPaymentProduct(data));
        },
      },
      variables: '',
    },
    checkItems.map((item) => item.productId.toString()),
  );

  console.log('productData :::::::::::::::: ', productData);
  console.log(
    'checkItems.map((item) => item.productId.toString()), :::::::::: ',
    checkItems.map((item) => item.productId.toString()),
  );
  useEffect(() => {
    console.log('productData useEffect');
    if (productData.length > 0) {
      // dispatch(orderSliceAction.addPaymentProduct(productData));
    }

    // setPaymentList(
    //   checkItems.map((item) => {
    //     const findedProduct = productData.find(
    //       (product: any) => product?.data?.id === item.productId,
    //     );
    //     const findedProduct2: any = { ...findedProduct };
    //     const result: PaymentProductType = {
    //       ...item,
    //       name: findedProduct2?.name,
    //       capacity: findedProduct2?.capacity,
    //       photo: findedProduct2?.photo,
    //       price: findedProduct2?.price,
    //     };
    //     return result;
    // return Number(findedProduct?.data?.price) * item.count;
    //   }),
    // );
    // setPaymentItems
  }, [productData]);

  // const {
  //   handleClick: ordererHandleClick,
  //   fullAddress: ordererFullAddress,
  //   zonecode: ordererZonecode,
  // } = usePostcode();

  const searchPostcode1 = usePostcode();

  const searchPostcode2 = usePostcode();
  console.log('paymentList ::: ', paymentList);
  const onSubmit = handleSubmit((data) => {
    console.log('submit success ::: ', data);

    //     // async/await을 사용하는 경우
    // async function main() {
    //   const tossPayments = await loadTossPayments(clientKey)
    // }

    // Promise를 사용하는 경우
    // loadTossPayments(clientKey).then((tossPayments) => {
    //   // ...
    //   console.log('tossPayments : ', tossPayments);
    //   console.log(
    //     'successUrl : ',
    //     `${process.env.NEXT_PUBLIC_API_DOMAIN}/order/redirect/success`,
    //   );

    //   tossPayments.requestPayment('카드', {
    //     // 결제 수단 파라미터
    //     // 결제 정보 파라미터

    //     amount: 15000,
    //     orderId: 'UVecykLOdC2lDE5T4ODXO',
    //     orderName: '토스 티셔츠 외 2건',
    //     customerName: '박토스',
    //     successUrl: `${process.env.NEXT_PUBLIC_API_DOMAIN}/order/redirect/success`,
    //     failUrl: `${process.env.NEXT_PUBLIC_API_DOMAIN}/order/redirect/fail`,
    //   });
    // });
  });

  return (
    <OrderPageView
      formData={formData}
      onSubmit={onSubmit}
      useOrderPostcode={searchPostcode1}
      useShippingPostcode={searchPostcode2}
      useCheckItems={paymentItems}
      paymentList={paymentList}
    />
  );
}

export default OrderPage;

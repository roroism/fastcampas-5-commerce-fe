import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import axios from 'axios';

import { Box, ChakraProps, Flex, Spinner, Text } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import productApi from '@apis/reactquery/QueryApi';
import {
  useGetMyInfoQuery,
  useGetOrderByOrderIdQuery,
  useGetOrderQuery,
} from '@apis/reactquery/QueryApi.query';

interface PaymentSuccessPageProps extends ChakraProps {}

function PaymentSuccessPage({ ...basisProps }: PaymentSuccessPageProps) {
  const router = useRouter();
  const { orderId, paymentKey, amount } = router.query;
  // const { data: userData } = useGetMyInfoQuery();

  // const { data: paymentData } = useGetOrderQuery({
  //   // [0]
  //   variables: userData?.id?.toString(),
  // });

  const { data: paymentByOrderIdData } = useGetOrderByOrderIdQuery({
    variables: orderId,
  });

  useEffect(() => {
    console.log('paymentByOrderIdData : ', paymentByOrderIdData);
    console.log(
      'Number(amount) === paymentByOrderIdData.price : ',
      Number(amount) === paymentByOrderIdData?.price,
    );
    if (
      orderId &&
      paymentKey &&
      amount &&
      typeof orderId === 'string' &&
      typeof amount === 'string' &&
      typeof paymentKey === 'string'
    ) {
      if (
        paymentByOrderIdData &&
        Number(amount) === paymentByOrderIdData.price
      ) {
        const form = new FormData();
        form.append('price', amount);
        form.append('paymentKey', paymentKey);
        form.append('method', paymentByOrderIdData?.method as string);
        form.append('userName', paymentByOrderIdData?.userName as string);
        form.append('userPhone', paymentByOrderIdData?.userPhone as string);
        form.append('userAddr', paymentByOrderIdData?.userAddr as string); // 주소
        form.append('shipName', paymentByOrderIdData?.shipName as string); // 배송받을사람
        form.append('shipPhone', paymentByOrderIdData?.shipPhone as string); // 배송연락처
        form.append('shipAddr', paymentByOrderIdData?.shipAddr as string); // 배송지주소
        form.append(
          'orderMessage',
          paymentByOrderIdData?.orderMessage as string,
        ); // 배송요청사항

        const paymentResult = async () =>
          await productApi.putOrderByOrderId({
            id: Number(orderId),
            data: form,
          });
        paymentResult();

        console.log('paymentResult : ', paymentResult);

        // const PaymentAuthorizationCall = async () => {
        //   const PaymentAuthorizationStatus = await axios.post(
        //     'https://api.tosspayments.com/v1/payments/confirm',
        //   );
        // };

        router.replace({
          pathname: `/order/complete`,
          query: { orderId: orderId },
        });
      }
    }
  }, []);

  return (
    <>
      <Box {...basisProps} h="100vh">
        <Flex w="full" h="full" justify="center" alignItems="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.500"
            size="xl"
          />
        </Flex>
      </Box>
    </>
  );
}

export default PaymentSuccessPage;

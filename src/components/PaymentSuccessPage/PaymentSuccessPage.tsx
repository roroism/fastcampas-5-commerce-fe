import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import axios from 'axios';

import { Box, ChakraProps, Flex, Spinner, Text } from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import productApi from '@apis/reactquery/QueryApi';
import { useGetMyInfoQuery } from '@apis/reactquery/QueryApi.query';

interface IOrderForm {
  userId: number;
  price: number;
  paymentKey: string;
  method: 'CARD';
  userName: string;
  userPhone: string;
  userAddr: string;
  shipName: string;
  shipPhone: string;
  shipAddr: string;
  orderMessage: string;
}

interface PaymentSuccessPageProps extends ChakraProps {}

function PaymentSuccessPage({ ...basisProps }: PaymentSuccessPageProps) {
  const { data: userData } = useGetMyInfoQuery();
  const router = useRouter();

  const { orderId, paymentKey, amount } = router.query;

  useEffect(() => {
    const form = new FormData();
    form.append('userId', userData?.id?.toString() || '');
    form.append('price', amount as string);
    // form.append('paymentKey', paymentKey as string);
    // form.append('paymentKey', null);
    form.append('method', 'CARD');
    form.append('userName', userData?.name as string);
    form.append('userPhone', userData?.phone as string);
    // form.append('userAddr', ); // 주소
    // form.append('shipName', ); // 배송받을사람
    // form.append('shipPhone', ); // 배송연락처
    // form.append('shipAddr', ); // 배송지주소
    // form.append('orderMessage', ); // 배송요청사항

    // const paymentResult = await productApi.postOrder(form);
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

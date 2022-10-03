import React from 'react';

import { ChakraProps } from '@chakra-ui/react';

import customUseFormforOrder from './CustomUseFormForOrder';
import OrderPageView from './OrderPage.view';

interface OrderPageProps extends ChakraProps {}

function OrderPage({ ...basisProps }: OrderPageProps) {
  const formData = customUseFormforOrder();
  const { handleSubmit } = formData;
  const onSubmit = handleSubmit(() => {
    console.log('submit success');
  });

  return <OrderPageView formData={formData} onSubmit={onSubmit} />;
}

export default OrderPage;

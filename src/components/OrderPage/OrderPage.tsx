import React from 'react';

import { Box, ChakraProps, Text } from '@chakra-ui/react';

interface OrderPageProps extends ChakraProps {}

function OrderPage({ ...basisProps }: OrderPageProps) {
  return (
    <Box {...basisProps}>
      <Text>OrderPage</Text>
    </Box>
  );
}

export default OrderPage;

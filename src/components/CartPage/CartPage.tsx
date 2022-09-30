import React from 'react';

import { Box, ChakraProps, Text } from '@chakra-ui/react';

interface CartPageProps extends ChakraProps {}

function CartPage({ ...basisProps }: CartPageProps) {
  return (
    <Box {...basisProps}>
      <Text>CartPage</Text>
    </Box>
  );
}

export default CartPage;

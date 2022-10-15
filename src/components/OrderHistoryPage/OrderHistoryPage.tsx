import React from 'react';

import { Box, ChakraProps, Text } from '@chakra-ui/react';

interface OrderHistoryPageProps extends ChakraProps {}

function OrderHistoryPage({ ...basisProps }: OrderHistoryPageProps) {
  return (
    <Box {...basisProps}>
      <Text>OrderHistoryPage</Text>
    </Box>
  );
}

export default OrderHistoryPage;

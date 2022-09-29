import React from 'react';

import { Box, ChakraProps, Text } from '@chakra-ui/react';

interface ProductsPageProps extends ChakraProps {}

function ProductsPage({ ...basisProps }: ProductsPageProps) {
  return (
    <Box {...basisProps}>
      <Text>ProductsPage</Text>
    </Box>
  );
}

export default ProductsPage;

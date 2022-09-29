import React from 'react';

import {
  Box,
  ChakraProps,
  UnorderedList,
  VisuallyHidden,
} from '@chakra-ui/react';

import ProductItem from './ProductItem';

interface ProductsPageProps extends ChakraProps {}

function ProductsPage({ ...basisProps }: ProductsPageProps) {
  return (
    <Box {...basisProps} px="16px" pt="120px" pb="80px">
      <VisuallyHidden as="h2">Product list</VisuallyHidden>
      <UnorderedList
        styleType="none"
        p={0}
        m={0}
        display="flex"
        flexDirection="column"
        gap="30px"
      >
        <ProductItem product={{ productname: '바스 & 샴푸' }} />
        <ProductItem product={{ productname: '바스 & 샴푸' }} />
      </UnorderedList>
    </Box>
  );
}

export default ProductsPage;

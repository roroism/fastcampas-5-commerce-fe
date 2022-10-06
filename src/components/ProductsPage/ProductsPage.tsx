import React from 'react';

import {
  Box,
  ChakraProps,
  UnorderedList,
  VisuallyHidden,
} from '@chakra-ui/react';

import { useGetProductListQuery } from '@apis/reactquery/QueryApi.query';

import ProductItem from './_fragments/ProductItem';

interface ProductsPageProps extends ChakraProps {}

function ProductsPage({ ...basisProps }: ProductsPageProps) {
  const { data } = useGetProductListQuery();

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
        {data?.results?.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
        {/* <ProductItem product={} /> */}
        {/* <ProductItem product={} /> */}
      </UnorderedList>
    </Box>
  );
}

export default ProductsPage;

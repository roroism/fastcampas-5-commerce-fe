import React from 'react';

import {
  Box,
  Button,
  ChakraProps,
  UnorderedList,
  VisuallyHidden,
} from '@chakra-ui/react';

import { useGetProductListQuery } from '@apis/reactquery/QueryApi.query';

import ProductItem from './_fragments/ProductItem';

import useScrollIsShow from 'hooks/useScrollIsShow';

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  thumbnail: string;
  tags: Array<{ id: number; name: string }>;
  avgRate: string | null;
  reviewCount: number;
}

interface ProductsPageProps extends ChakraProps {}

function ProductsPage({ ...basisProps }: ProductsPageProps) {
  const { ref, isShow } = useScrollIsShow<HTMLDivElement>(1);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useGetProductListQuery();

  React.useEffect(() => {
    if (isShow) {
      console.log('isShow');
      fetchNextPage();
    }
  }, [isShow]);

  console.log('data : ', data);

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
        {data?.pages.map((item) => {
          const products: IProduct[] = item.results;

          return products.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          });
        })}
      </UnorderedList>
      {isFetching ? <Box>Loading...</Box> : null}
      {/* <Button onClick={() => fetchNextPage()}>fetch</Button> */}
      <div ref={ref} style={{ backgroundColor: 'red' }}></div>
    </Box>
  );
}

export default ProductsPage;

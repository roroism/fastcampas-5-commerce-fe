import Router from 'next/router';
import React, { useEffect, useRef } from 'react';

import {
  Box,
  Button,
  ChakraProps,
  Flex,
  Spinner,
  UnorderedList,
  VisuallyHidden,
} from '@chakra-ui/react';

import productApi from '@apis/reactquery/QueryApi';
import {
  useGetCartQuery,
  useGetMyInfoQuery,
  useGetProductListQuery,
} from '@apis/reactquery/QueryApi.query';

import ProductItem from './_fragments/ProductItem';

import useScrollIsShow from 'hooks/useScrollIsShow';

interface IProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  capacity: number;
  thumbnail: string;
  tag: Array<{ id: number; name: string }>;
  avgRate: number | null;
  reviewCount: number;
}

const cachedScrollPositions: number[][] = [];

interface ProductsPageProps extends ChakraProps {}

function ProductsPage({ ...basisProps }: ProductsPageProps) {
  const boxRef = useRef<HTMLDivElement>(null);
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
      hasNextPage && fetchNextPage();
    }
  }, [isShow]);

  const { data: userData } = useGetMyInfoQuery();
  //   {
  //   options: { staleTime: 1800, cacheTime: Infinity },
  // }
  const { data: cartData = [] } = useGetCartQuery({
    variables: userData?.id,
    options: {
      enabled: !!userData,
      onSuccess: (data) => {
        if (data.length === 0) {
          // 장바구니 x 상품 x
          const form = new FormData();
          form.append('userId', String(userData?.id));
          productApi.postCart(form);
          console.log('장바구니 생성!!!!!');
          // 장바구니가 비어있습니다 페이지 출력. useState에 flag추가하여 조건부 렌더링 필요.
        } else if (data[0].cartitem.length === 0) {
          // 장바구니 o 상품 x
          // 장바구니가 비어있습니다 페이지 출력. useState에 flag추가하여 조건부 렌더링 필요.
        } else {
          // 장바구니 o 상품 o
          // product 마다 이름 가져오기.
        }
      },
    },
  });

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'auto';
      let shouldScrollRestore: { x: number; y: number } | null;

      Router.events.on('routeChangeStart', () => {
        cachedScrollPositions.push([window.scrollX, window.scrollY]);
      });

      Router.events.on('routeChangeComplete', () => {
        if (shouldScrollRestore) {
          const { x, y } = shouldScrollRestore;
          window.scrollTo(x, y);
          shouldScrollRestore = null;
        }
        window.history.scrollRestoration = 'auto';
      });

      Router.beforePopState(() => {
        if (cachedScrollPositions.length > 0) {
          const [x, y]: [number, number] = cachedScrollPositions.pop() as [
            number,
            number,
          ];
          shouldScrollRestore = { x, y };
        }
        window.history.scrollRestoration = 'manual';
        return true;
      });
    }
  }, []);

  return (
    <Box {...basisProps} px="16px" pt="120px" pb="80px" ref={boxRef}>
      <VisuallyHidden as="h2">main contents</VisuallyHidden>
      <Box>
        <VisuallyHidden as="h3">Product list</VisuallyHidden>
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
      </Box>
      {isFetching ? (
        <Box>
          <Box {...basisProps} h="100%">
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
        </Box>
      ) : null}
      {/* <Button onClick={() => fetchNextPage()}>fetch</Button> */}
      <div ref={ref} style={{ backgroundColor: 'red' }}></div>
    </Box>
  );
}

export default ProductsPage;

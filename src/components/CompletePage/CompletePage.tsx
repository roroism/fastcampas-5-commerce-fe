import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import {
  Box,
  Button,
  ChakraProps,
  Flex,
  HStack,
  Link,
  Skeleton,
  Text,
  UnorderedList,
  VStack,
  VisuallyHidden,
} from '@chakra-ui/react';

import {
  useGetMyInfoQuery,
  useGetOrderByOrderIdQuery,
  useGetProductByIdQueries,
  useGetProductByIdQueries2,
  useGetSuccessPaymentProductsQuery,
} from '@apis/reactquery/QueryApi.query';
import {
  GetOrderStatusDTOType,
  OrderStatusDTOType,
  ShippingStatus,
} from '@apis/reactquery/QueryApi.type';
import useAppStore from '@features/useAppStore';

import OrderItem from '@components/OrderPage/_fragments/OrderItem';

import { LAYOUT } from '@constants/layout';

import priceFormat from 'hooks/priceFormat';

interface IorderHistoryProduct {
  id: number;
  orderId: string;
  productId: number;
  count: number;
  shippingStatus: ShippingStatus;
  created: string;
  name?: string;
  capacity?: number;
  price?: number;
  photo?: string;
  shippingPrice?: number;
}

interface CompletePageProps extends ChakraProps {}

function CompletePage({ ...basisProps }: CompletePageProps) {
  const router = useRouter();
  const [orderList, setOrderList] = useState<IorderHistoryProduct[]>([]);
  const { orderId } = router.query;
  const { data: userData } = useGetMyInfoQuery();
  const { data: paymentByOrderIdData, isLoading: isOrderLoading } =
    useGetOrderByOrderIdQuery({
      variables: orderId,
      options: {
        enabled: !!orderId,
      },
    });
  const { data: paymentProduct } = useGetSuccessPaymentProductsQuery({
    //status
    variables: userData?.id,
    options: {
      enabled: !!paymentByOrderIdData && !!userData,
      // onSuccess: (data: IorderHistoryProduct[]) => {
      //   console.log('data : ', data);
      //   setOrderList(data);
      // },
      // select: ({ results }: GetOrderStatusDTOType) => {
      //   console.log(
      //     'results.filter ; ',
      //     results.filter(
      //       (item: OrderStatusDTOType) => item.orderId === orderId,
      //     ),
      //   );
      //   return results.filter(
      //     (item: OrderStatusDTOType) => item.orderId === orderId,
      //   );
      // },
      onSuccess: ({ results }: GetOrderStatusDTOType) => {
        const result = results.filter(
          (item: OrderStatusDTOType) => item.orderId === orderId,
        );
        console.log('onSuccess :: ', result);
        setOrderList(result);
      },
    },
  });

  const { query: productData } = useGetProductByIdQueries2(
    {
      // options: { enabled: !!productIdList },
      options: {
        enabled: !!paymentProduct,
        // suspense: true,
        onSuccess: (data) => {
          console.log('cart data : ', data);
          console.log('orderList before onSuccess : ', orderList);

          const targetIndex = orderList?.findIndex(
            (item) => item.productId === data.id && !('name' in item),
          );
          const oldOrder = orderList[targetIndex];
          const newOrder = {
            ...oldOrder,
            name: data.name,
            capacity: data.capacity,
            price: data.price,
            photo: data.photo,
          };
          setOrderList((prev) => [
            ...prev.slice(0, targetIndex),
            newOrder,
            ...prev.slice(targetIndex + 1),
          ]);
        },
      },
      variables: '',
    },
    orderList?.map((item) => ({
      productId: item?.productId?.toString(),
      id: item?.id?.toString(),
    })),
    // orderList?.map((item) => item?.productId?.toString()),
  );

  // const { paymentList } = useAppStore((state) => state.ORDER);
  console.log('orderList : ', orderList);

  return (
    <Box mt={LAYOUT.HEADER.HEIGHT} {...basisProps} bgColor="gray.100">
      <VisuallyHidden as="h2">main contents</VisuallyHidden>
      <Box bgColor="white" px="16px">
        <Text as="h3" fontWeight="700" fontSize="1.25rem">
          결제내역
        </Text>

        <Box mt="80px">
          <Skeleton
            isLoaded={!isOrderLoading}
            fadeDuration={1}
            startColor="white"
            endColor="white"
          >
            <Text fontWeight="700" fontSize="12px">
              [{paymentByOrderIdData?.created.toString().split('T')[0]}]
            </Text>
          </Skeleton>
          <UnorderedList
            styleType="none"
            p={0}
            m={0}
            mt="11px"
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            <Skeleton
              isLoaded={!productData.some((result) => result.isLoading)}
              fadeDuration={1.5}
              startColor="white"
              endColor="white"
            >
              {orderList?.map((product, idx) => (
                <OrderItem
                  key={idx}
                  product={product}
                  shippingStatus={product.shippingStatus}
                />
              ))}
            </Skeleton>
          </UnorderedList>
        </Box>
      </Box>

      <Box mt="10px" bgColor="white" px="16px">
        <Text as="h4" fontWeight="700" fontSize="1rem" py="14px">
          배송지 정보
        </Text>
        <VStack
          fontWeight="400"
          fontSize="1rem"
          spacing="10px"
          pt="15px"
          pb="24px"
          justify="flex-start"
          w="full"
        >
          <HStack spacing="10px" w="full">
            <Box w="92px">이름</Box>
            <Box as="p" color="gray.700">
              {paymentByOrderIdData?.shipName}
            </Box>
          </HStack>
          <HStack spacing="10px" w="full">
            <Box w="92px">핸드폰 번호</Box>
            <Box as="p" color="gray.700">
              {paymentByOrderIdData?.shipPhone.replace(
                /^(\d{2,3})(\d{3,4})(\d{4})$/,
                `$1-$2-$3`,
              )}
            </Box>
          </HStack>
          <HStack spacing="10px" w="full">
            <Box w="92px">우편번호</Box>
            <Box as="p" color="gray.700">
              {paymentByOrderIdData?.shipAddrPost}
            </Box>
          </HStack>
          <HStack spacing="10px" w="full" alignItems="flex-start">
            <Box w="92px">주소</Box>
            <Box as="p" w="214px" color="gray.700" overflow="hidden">
              {paymentByOrderIdData?.shipAddrPost}&nbsp;
              {paymentByOrderIdData?.shipAddrDetail}
            </Box>
          </HStack>
          <HStack spacing="10px" w="full">
            <Box w="92px">배송요청사항</Box>
            <Box as="p" color="gray.700">
              {paymentByOrderIdData?.orderMessage}
            </Box>
          </HStack>
        </VStack>
      </Box>

      <Box mt="10px" bgColor="white" px="16px">
        <Text as="h4" fontWeight="700" fontSize="1rem" py="13px">
          결제정보
        </Text>
        <Flex
          flexDirection="column"
          pb="20px"
          borderBottom="1px solid"
          borderColor="gray.200"
          gap="10px"
          mt="40px"
        >
          <Flex justifyContent="space-between" color="gray.600">
            <Box>총 상품금액</Box>
            <Box as="p" textAlign="right">
              {priceFormat(paymentByOrderIdData?.price)}&nbsp;원
            </Box>
          </Flex>
          <Flex justifyContent="space-between" color="gray.600">
            <Box>총 배송비</Box>
            <Box as="p" textAlign="right">
              {priceFormat(paymentByOrderIdData?.shippingPrice)}&nbsp;원
            </Box>
          </Flex>
          <Flex justifyContent="space-between" color="gray.600">
            <Box>결제수단</Box>
            <Box as="p" textAlign="right" fontWeight="700">
              {paymentByOrderIdData?.method === 'CARD'
                ? '신용카드 결제'
                : '기타 결제 방법'}
            </Box>
          </Flex>
        </Flex>
        <Box>
          <Flex justifyContent="space-between" pt="20px">
            <Box>결제금액</Box>
            <Box as="strong" textAlign="right" color="primary.500">
              {priceFormat(
                (paymentByOrderIdData?.price || 0) +
                  (paymentByOrderIdData?.shippingPrice || 0),
              )}
              &nbsp;원
            </Box>
          </Flex>
        </Box>
      </Box>
      <Flex gap="13px" pt="50px" pb="30px" px="16px" bgColor="white">
        <NextLink href="/" passHref replace>
          <Link w="100%">
            <Button
              variant="outline"
              fontWeight="700"
              colorScheme="primary"
              w="100%"
              h="50px"
              borderRadius="25px"
              fontSize="1rem"
              // onClick={onOpen}
            >
              메인으로 이동
            </Button>
          </Link>
        </NextLink>
        <NextLink href="/mypage/history" passHref replace>
          <Link w="100%">
            <Button
              variant="solid"
              fontWeight="700"
              colorScheme="primary"
              w="100%"
              h="50px"
              borderRadius="25px"
              fontSize="1rem"
            >
              주문내역 이동
            </Button>
          </Link>
        </NextLink>
      </Flex>
    </Box>
  );
}

export default CompletePage;

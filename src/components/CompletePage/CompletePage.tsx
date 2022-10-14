import React from 'react';

import {
  Box,
  Button,
  ChakraProps,
  Flex,
  HStack,
  Text,
  UnorderedList,
  VStack,
  VisuallyHidden,
} from '@chakra-ui/react';

import OrderItem from '@components/OrderPage/_fragments/OrderItem';

import { LAYOUT } from '@constants/layout';

interface CompletePageProps extends ChakraProps {}

function CompletePage({ ...basisProps }: CompletePageProps) {
  return (
    <Box mt={LAYOUT.HEADER.HEIGHT} {...basisProps} bgColor="gray.100">
      <VisuallyHidden as="h2">main contents</VisuallyHidden>
      <Box bgColor="white" px="16px">
        <Text as="h3" fontWeight="700" fontSize="1.25rem">
          결제내역
        </Text>

        <Box mt="80px">
          <Text fontWeight="700" fontSize="12px">
            [2021-04-01]
          </Text>
          <UnorderedList
            styleType="none"
            p={0}
            m={0}
            mt="11px"
            display="flex"
            flexDirection="column"
            gap="10px"
          >
            {/* <OrderItem paymentCompleted /> */}
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
            {/* <Box color="gray.700">{order?.shippingName}</Box> */}
            <Box color="gray.700">김인코스런</Box>
          </HStack>
          <HStack spacing="10px" w="full">
            <Box w="92px">핸드폰 번호</Box>
            {/* <Box color="gray.700">{order?.shippingPhone}</Box> */}
            <Box color="gray.700">010-1234-1234</Box>
          </HStack>
          <HStack spacing="10px" w="full">
            <Box w="92px">우편번호</Box>
            {/* <Box color="gray.700">{order?.shippingZipcode}</Box> */}
            <Box color="gray.700">01234</Box>
          </HStack>
          <HStack spacing="10px" w="full" alignItems="flex-start">
            <Box w="92px">주소</Box>
            {/* <Box w="214px" color="gray.700">
              {order?.shippingAddress} {order?.shippingAddressDetail}
            </Box> */}
            <Box w="214px" color="gray.700" overflow="hidden">
              서울특별시 마포구 성산동 123-3 성산빌딩 B동 302호
            </Box>
          </HStack>
          {/* {order?.shippingRequest && (
            <HStack spacing="10px" w="full">
              <Box w="92px">배송요청사항</Box>
              <Box color="gray.700">{order?.shippingRequest}</Box>
            </HStack>
          )} */}
          <HStack spacing="10px" w="full">
            <Box w="92px">배송요청사항</Box>
            {/* <Box color="gray.700">{order?.shippingRequest}</Box> */}
            <Box color="gray.700">문앞에 두고 가주세요</Box>
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
            <Box textAlign="right">108,000&nbsp;원</Box>
          </Flex>
          <Flex justifyContent="space-between" color="gray.600">
            <Box>총 배송비</Box>
            <Box textAlign="right">0&nbsp;원</Box>
          </Flex>
          <Flex justifyContent="space-between" color="gray.600">
            <Box>결제수단</Box>
            <Box textAlign="right" fontWeight="700">
              신용카드 결제
            </Box>
          </Flex>
        </Flex>
        <Box>
          <Flex justifyContent="space-between" pt="20px">
            <Box>결제금액</Box>
            <Box as="strong" textAlign="right" color="primary.500">
              108,000&nbsp;원
            </Box>
          </Flex>
        </Box>
      </Box>
      <Flex gap="13px" pt="50px" pb="30px" px="16px" bgColor="white">
        <Button
          variant="outline"
          fontWeight="700"
          colorScheme="primary"
          w="50%"
          h="50px"
          borderRadius="25px"
          fontSize="1rem"
          // onClick={onOpen}
        >
          메인으로 이동
        </Button>

        <Button
          variant="solid"
          fontWeight="700"
          colorScheme="primary"
          w="50%"
          h="50px"
          borderRadius="25px"
          fontSize="1rem"
        >
          주문내역 이동
        </Button>
      </Flex>
    </Box>
  );
}

export default CompletePage;

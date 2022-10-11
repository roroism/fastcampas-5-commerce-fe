import React, { useEffect, useRef, useState } from 'react';

import {
  Box,
  Button,
  ChakraProps,
  Checkbox,
  Flex,
  TagLabel,
} from '@chakra-ui/react';

import instance from '@apis/_axios/instance';
import productApi from '@apis/reactquery/QueryApi';
import {
  useGetCartQuery,
  useGetMyInfoQuery,
} from '@apis/reactquery/QueryApi.query';

import { LAYOUT } from '@constants/layout';

import CartItem from './_fragments/CartItem';

// import LAYOUT.HEADER.HEADER from '';

interface CartPageProps extends ChakraProps {}

function CartPage({ ...basisProps }: CartPageProps) {
  const { data: userData } = useGetMyInfoQuery({
    options: { staleTime: 1800, cacheTime: Infinity },
  });
  const { data: cartData } = useGetCartQuery({
    variables: userData?.id,
    options: {
      enabled: !!userData,
      onSuccess: (data) => {
        if (data.length === 0) {
          const form = new FormData();
          form.append('userId', String(userData?.id));
          productApi.postCart(form);
        }
      },
    },
  });
  // const [checkItems, setCheckItems] = useState([]);

  // 체크박스 단일 선택
  // const handleSingleCheck = (checked, id) => {
  //   if (checked) {
  //     // 단일 선택 시 체크된 아이템을 배열에 추가
  //     setCheckItems(prev => [...prev, id]);
  //   } else {
  //     // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
  //     setCheckItems(checkItems.filter((el) => el !== id));
  //   }
  // };

  // 체크박스 전체 선택
  //  const handleAllCheck = (checked) => {
  //   if(checked) {
  //     // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트
  //     const idArray = [];
  //     data.forEach((el) => idArray.push(el.id));
  //     setCheckItems(idArray);
  //   }
  //   else {
  //     // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
  //     setCheckItems([]);
  //   }
  // }
  console.log('userData : ', userData);
  console.log('cartData : ', cartData);
  useEffect(() => {
    // const fetchFn = async () => {
    //   await instance
    //     .get(`/v1/cart/?user_id=${userData?.id}`)
    //     .then(async (res) => {
    //       console.log('cart data 가져옴', res);
    //       if (res.data.length == 0) {
    //         const form = new FormData();
    //         form.append('userId', String(userData?.id));
    //         await instance
    //           .post(`/v1/cart/`, form, {
    //             headers: { 'content-type': 'multipart/form-data' },
    //           })
    //           .then((res) => {
    //             console.log('cart생성 성공 : ', res);
    //           })
    //           .catch((err) => {
    //             console.log('에러 : err', err);
    //           });
    //       }
    //     });
    // };
    // fetchFn();
  }, [userData]);

  return (
    <Box {...basisProps} mt={LAYOUT.HEADER.HEIGHT}>
      <Flex
        justifyContent="space-between"
        color="gray.600"
        alignItems="center"
        py="13px"
      >
        <Box>
          <Checkbox
            colorScheme="primary"
            w="auto"
            // onChange={onChange}
            // isChecked={item?.checked}

            // onChange={(e) => handleAllCheck(e.target.checked)}
            // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
            // checked={checkItems.length === data.length ? true : false}
          >
            모두선택
          </Checkbox>
        </Box>
        <Box>선택삭제</Box>
      </Flex>

      <Box as="ul">
        <CartItem></CartItem>
        <CartItem></CartItem>
      </Box>

      <Box px="16px" pt="20px" pb="30px" mt="10px">
        <Flex
          flexDirection="column"
          pb="20px"
          borderBottom="1px solid"
          borderColor="gray.200"
          gap="10px"
        >
          <Flex justifyContent="space-between" color="gray.600">
            <Box>총 상품금액</Box>
            <Box textAlign="right">108,000&nbsp;원</Box>
          </Flex>
          <Flex justifyContent="space-between" color="gray.600">
            <Box>총 배송비</Box>
            <Box textAlign="right">0&nbsp;원</Box>
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
        <Box>
          <Button
            mt="20px"
            fontWeight="700"
            w="100%"
            h="50px"
            borderRadius="25px"
            backgroundColor="primary.500"
            color="white"
            fontSize="1rem"
          >
            결제하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default CartPage;

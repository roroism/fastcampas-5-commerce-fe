import { useCallback, useEffect, useState } from 'react';

import {
  Box,
  ChakraProps,
  Checkbox,
  Flex,
  Image,
  Input,
  VisuallyHidden,
} from '@chakra-ui/react';

import { usePutProductInCartItemMutation } from '@apis/reactquery/QueryApi.mutation';
import { useGetMyInfoQuery } from '@apis/reactquery/QueryApi.query';
import {
  CartItemDTOType,
  ProductDetailDTOType,
  ProductInCartItemDTOType,
  ProductInCartItemParamPutType,
} from '@apis/reactquery/QueryApi.type';
import { orderSliceAction } from '@features/order/orderSlice';

import { Dispatch } from '@reduxjs/toolkit';
import { UseMutateFunction, useQueryClient } from '@tanstack/react-query';

import priceFormat from 'hooks/priceFormat';

interface CartItemProps extends ChakraProps {
  productData: ProductDetailDTOType | undefined;
  cartData: CartItemDTOType | undefined;
  mutatingCount: UseMutateFunction<
    ProductInCartItemDTOType,
    any,
    ProductInCartItemParamPutType,
    unknown
  >;
  mutatingDelete: UseMutateFunction<boolean, any, string, unknown>;
  checkUseState: [CartItemDTOType[], Dispatch];
}

const CartItem = ({
  productData,
  cartData,
  mutatingCount,
  mutatingDelete,
  checkUseState: [checkItems, dispatch],
  ...basisProps
}: CartItemProps) => {
  const handleDecQuantity = () => {
    if ((cartData?.count || 1) > 1) {
      const form = new FormData();
      form.append('count', String((cartData?.count || 2) - 1));

      mutatingCount({ id: cartData?.id as number, data: form });
    }
  };

  const handleIncQuantity = () => {
    const form = new FormData();
    form.append('count', String((cartData?.count || 1) + 1));

    mutatingCount({ id: cartData?.id as number, data: form });
  };

  const handleDeleteCartitem = () => {
    mutatingDelete(String(cartData?.id));
    dispatch(orderSliceAction.deleteProductInCart(cartData?.id));
  };

  // 체크박스 단일 선택
  const handleSingleCheck = (checked: boolean) => {
    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      // setCheckItems((prev: Array<CartItemDTOType>) => [...prev, cartData]);
      dispatch(orderSliceAction.addProductInCart(cartData));
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      dispatch(orderSliceAction.deleteProductInCart(cartData?.id));
    }
  };

  return (
    <Box
      w="100%"
      as="li"
      position="relative"
      p={0}
      m={0}
      listStyleType="none"
      marginStart="0"
      px="16px"
      py="20px"
      my="10px"
    >
      <VisuallyHidden as="h4">{productData?.name}</VisuallyHidden>
      <Flex w="100%" gap="10px">
        <Box>
          <Checkbox
            colorScheme="primary"
            w="20px"
            h="20px"
            onChange={(e) => handleSingleCheck(e.target.checked)}
            // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
            isChecked={
              checkItems.some(
                (item: CartItemDTOType) => item.id === cartData?.id,
              )
                ? true
                : false
            }
          ></Checkbox>
        </Box>
        <Flex flexDirection="column" justifyContent="flex-start" flexGrow={1}>
          <Flex>
            <Box w="90px" h="90px" backgroundColor="#f9f9f9" mr="10px">
              <Image w="100%"></Image>
            </Box>
            <Flex
              flexDirection="column"
              overflow="hidden"
              py="3px"
              justifyContent="space-between"
            >
              <Box as="strong" fontWeight="700">
                {productData?.name}
              </Box>
              <Box
                as="p"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                overflow="hidden"
                color="gray.600"
              >
                {productData?.name} | {productData?.capacity}ml
              </Box>
              <Box as="span" fontWeight="700" color="primary.500">
                {priceFormat(productData?.price)}원
              </Box>
            </Flex>
            <Box
              as="button"
              position="absolute"
              top="20px"
              right="16px"
              w="20px"
              h="20px"
              onClick={handleDeleteCartitem}
            >
              <Box
                position="relative"
                top="-8px"
                right="6px"
                _before={{
                  position: 'absolute',
                  left: '15px',
                  content: '""',
                  height: '15px',
                  width: '1.5px',
                  backgroundColor: '#1A1A1A',
                  transform: 'rotate(45deg)',
                  borderRadius: '5px',
                }}
                _after={{
                  position: 'absolute',
                  left: '15px',
                  content: '""',
                  height: '15px',
                  width: '1.5px',
                  backgroundColor: '#1A1A1A',
                  transform: 'rotate(-45deg)',
                  borderRadius: '5px',
                }}
              ></Box>
            </Box>
          </Flex>

          <Flex
            flexDirection="column"
            mt="15px"
            p="10px"
            w="full"
            bg="gray.200"
            borderRadius="5px"
            gap="4px"
          >
            <Box>
              <Box color="gray.600">{productData?.name}</Box>
            </Box>
            <Flex justifyContent="space-between">
              <Flex h="25px" alignSelf="center">
                <Box
                  as="button"
                  position="relative"
                  bg="white"
                  border="1px solid #EAECF0"
                  borderRadius="5px 0px 0px 5px"
                  p={0}
                  w="25px"
                  h="25px"
                  _after={{
                    content: '""',
                    display: 'block',
                    height: '1px',
                    width: '9px',
                    backgroundColor: '#4A4D55',
                    position: 'absolute',
                    top: '11px',
                    left: '7px',
                  }}
                  _hover={{ cursor: 'pointer' }}
                  onClick={handleDecQuantity}
                ></Box>
                <Flex
                  w="23px"
                  h="full"
                  borderTop="1px solid #EAECF0"
                  borderBottom="1px solid #EAECF0"
                >
                  <Input
                    w="full"
                    h="full"
                    border="none"
                    fontSize="12px"
                    textAlign="center"
                    color="gray.800"
                    p={0}
                    bg="white"
                    // value={quantity}
                    value={cartData?.count}
                    readOnly
                  ></Input>
                </Flex>
                <Box
                  as="button"
                  position="relative"
                  bg="white"
                  border="1px solid #EAECF0"
                  borderRadius="0px 5px 5px 0px"
                  w="25px"
                  h="25px"
                  p={0}
                  _before={{
                    content: '""',
                    display: 'block',
                    width: '1px',
                    height: '9px',
                    backgroundColor: '#4A4D55',
                    position: 'absolute',
                    top: '7px',
                    left: '11px',
                  }}
                  _after={{
                    content: '""',
                    display: 'block',
                    height: '1px',
                    width: '9px',
                    backgroundColor: '#4A4D55',
                    position: 'absolute',
                    top: '11px',
                    left: '7px',
                  }}
                  onClick={handleIncQuantity}
                  _hover={{ cursor: 'pointer' }}
                ></Box>
              </Flex>
              <Flex alignSelf="center" as="strong" color="gray.600">
                {priceFormat(productData?.price)}원
              </Flex>
            </Flex>
          </Flex>
          <Flex mt="15px" justifyContent="space-between">
            <Flex alignItems="center">배송비 무료</Flex>
            <Box as="strong" fontSize="1.25rem">
              {priceFormat(
                (productData?.price || 100000) * (cartData?.count || 1),
              )}
              원
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CartItem;

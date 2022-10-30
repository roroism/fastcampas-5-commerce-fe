import Router, { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Box,
  Button,
  ChakraProps,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerProps,
  Flex,
  HStack,
  Image,
  Input,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';

import {
  usePostCartItemMutation,
  usePutProductInCartItemMutation,
} from '@apis/reactquery/QueryApi.mutation';
import {
  CART_API_QUERY_KEY,
  MYINFO_API_QUERY_KEY,
  useGetCartQuery,
  useGetMyInfoQuery,
} from '@apis/reactquery/QueryApi.query';
import { ProductDetailDTOType } from '@apis/reactquery/QueryApi.type';
import { orderSliceAction } from '@features/order/orderSlice';

import CartModal from '@components/Modals/_fragments/CartModal';

import { useQueryClient } from '@tanstack/react-query';

import priceFormat from 'hooks/priceFormat';

interface OrderDrawerProps extends DrawerProps {
  data?: ProductDetailDTOType;
}

function OrderDrawer({
  onClose,
  isOpen,
  data,
}: Omit<OrderDrawerProps, 'children'>) {
  const router = useRouter();
  const { data: userData } = useGetMyInfoQuery();
  const dispatch = useDispatch();
  //   {
  //   options: { staleTime: 1800, cacheTime: Infinity },
  // }
  const queryClient = useQueryClient();
  // console.log('queryClient : ', queryClient);
  // const userData = queryClient.getQueryData(MYINFO_API_QUERY_KEY.GET());
  // console.log('userData : ', userData);
  const { data: cartData = [] } = useGetCartQuery({
    variables: userData?.id,
    options: { enabled: !!userData },
  });
  // console.log('OrderDrawer cartData : ', cartData);
  const [quantity, setQuantity] = useState<number>(1);
  const [totalQuantity, setTotalQuantity] = useState<number>(1);
  const { mutate: mutatingCart } = usePostCartItemMutation(data?.id || 0, {
    options: {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(CART_API_QUERY_KEY.GET(userData?.id));
      },
    },
  });
  const { mutate: mutatingCount } = usePutProductInCartItemMutation({
    options: {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(CART_API_QUERY_KEY.GET(userData?.id));
      },
    },
  });
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();

  const decQuantity = useCallback(() => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }, [quantity]);

  const incQuantity = useCallback(() => {
    setQuantity((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // setTotalQuantity(
    //   (Number(
    //     cartData[0]?.cartitem?.find((item) => item.productId === data?.id)
    //       ?.count,
    //   ) || 0) + quantity,
    // );
    setTotalQuantity(quantity);
    // console.log('quantity : ', quantity);
  }, [quantity, cartData, data?.id]);

  const handleCartClick = () => {
    // console.log('totalQuantity : ', totalQuantity);
    const hasProductInCartitem = cartData[0]?.cartitem?.find(
      (item) => item.productId === data?.id,
    );

    if (!hasProductInCartitem) {
      // undefined 이면 post로 /v1/cart/item/ item생성
      const form = new FormData();
      form.append('productId', String(data?.id));
      form.append('cartId', String(cartData[0].id));
      form.append('count', String(totalQuantity));

      mutatingCart(form);
    } else {
      // undefined 가 아니면 totalQuantity 를 count로 patch /v1/cart/item/{id}
      const form = new FormData();
      form.append('count', String(totalQuantity));

      mutatingCount({ id: hasProductInCartitem.id, data: form });
    }

    setQuantity(1);
    modalOnOpen();
  };

  const handleOrderClick = () => {
    const hasProductInCartitem = cartData[0]?.cartitem?.find(
      (item) => item.productId === data?.id,
    );

    if (hasProductInCartitem && data?.id) {
      dispatch(
        orderSliceAction.productInCart([
          {
            id: hasProductInCartitem.id,
            productId: data?.id,
            cartId: cartData[0].id,
            count: totalQuantity,
          },
        ]),
      );
    } else if (data?.id) {
      dispatch(
        orderSliceAction.productInCart([
          {
            id: null,
            productId: data?.id,
            cartId: cartData[0].id,
            count: totalQuantity,
          },
        ]),
      );
    }

    router.push('/order');
  };

  return (
    <>
      <Drawer
        placement="bottom"
        onClose={onClose}
        isOpen={isOpen}
        autoFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent bg="transparent">
          <DrawerBody px="16px" py="20px" bg="white" borderTopRadius="20px">
            <Box>
              <VStack
                alignItems="flex-start"
                p="10px"
                w="full"
                bg="gray.200"
                borderRadius="5px"
              >
                <Box>{data?.name}</Box>
                <Flex justify="space-between" w="full" mt="4px">
                  <Flex h="25px" alignSelf="center">
                    <Box
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
                      onClick={decQuantity}
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
                        value={quantity}
                        readOnly
                      ></Input>
                    </Flex>
                    <Box
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
                      onClick={incQuantity}
                      _hover={{ cursor: 'pointer' }}
                    ></Box>
                  </Flex>
                  <Flex fontWeight="700" color="gray.600" alignItems="center">
                    {/* {priceToString(product?.price)}원
                     */}
                    {priceFormat(data?.price)}원
                  </Flex>
                </Flex>
              </VStack>
              <Flex justify="space-between" w="full" pt="15px">
                <Box>
                  총 수량&nbsp;
                  <span style={{ color: '#FF710B', fontWeight: '700' }}>
                    {totalQuantity}
                  </span>
                  &nbsp;개
                </Box>
                <Box>
                  합계&nbsp;
                  <span style={{ fontWeight: '700' }}>
                    {priceFormat((data?.price || 0) * totalQuantity)}
                  </span>
                  원
                </Box>
              </Flex>
              <Flex justify="space-between" w="100%" pt="15px" pb="10px">
                <Button
                  variant="outline"
                  colorScheme="primary"
                  w="calc(50% - 6.5px)"
                  h="50px"
                  borderRadius="25px"
                  size="sd"
                  py="12px"
                  onClick={handleCartClick}
                >
                  장바구니
                </Button>
                <Button
                  colorScheme="primary"
                  w="calc(50% - 6.5px)"
                  h="50px"
                  borderRadius="25px"
                  size="sd"
                  py="12px"
                  onClick={handleOrderClick}
                >
                  바로구매
                </Button>
              </Flex>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <CartModal
        title="cartmodal"
        isOpen={modalIsOpen}
        onClose={modalOnClose}
      />
    </>
  );
}

export default OrderDrawer;

import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Box,
  Button,
  ChakraProps,
  Checkbox,
  Flex,
  Link,
  Skeleton,
  TagLabel,
  VisuallyHidden,
} from '@chakra-ui/react';

import instance, { setAuthHeader } from '@apis/_axios/instance';
import productApi from '@apis/reactquery/QueryApi';
import {
  useDeleteCartItemMutation,
  usePutProductInCartItemMutation,
} from '@apis/reactquery/QueryApi.mutation';
import {
  CART_API_QUERY_KEY,
  useGetCartQuery,
  useGetMyInfoQuery,
  useGetProductByIdQueries,
} from '@apis/reactquery/QueryApi.query';
import { CartItemDTOType } from '@apis/reactquery/QueryApi.type';
import { orderSliceAction } from '@features/order/orderSlice';
import useAppStore from '@features/useAppStore';

import { LAYOUT } from '@constants/layout';
import { useQueryClient } from '@tanstack/react-query';
import { getToken } from '@utils/localStorage/token';

import CartItem from './_fragments/CartItem';

import priceFormat from 'hooks/priceFormat';

// import LAYOUT.HEADER.HEADER from '';

interface CartPageProps extends ChakraProps {}

function CartPage({ ...basisProps }: CartPageProps) {
  const router = useRouter();
  const [productIdList, setProductIdList] = useState<Array<string>>([]);
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [checkedPrice, setCheckedPrice] = useState<number>(0);
  const [isCartitem, setIsCartitem] = useState<boolean>(true);
  const { data: userData } = useGetMyInfoQuery();
  //   {
  //   options: { staleTime: 1800, cacheTime: Infinity },
  // }
  const { data: cartData = [], isLoading: isLoadingCartData } = useGetCartQuery(
    {
      variables: userData?.id,
      options: {
        enabled: !!userData,
        onSuccess: (data) => {
          if (data.length === 0) {
            // 장바구니 x 상품 x
            const form = new FormData();
            form.append('userId', String(userData?.id));
            productApi.postCart(form);
            // 장바구니가 비어있습니다 페이지 출력. useState에 flag추가하여 조건부 렌더링 필요.
            setIsCartitem(false);
          } else if (data[0].cartitem.length === 0) {
            // 장바구니 o 상품 x
            // dispatch(orderSliceAction.productInCart([...data[0]?.cartitem]));
            // 장바구니가 비어있습니다 페이지 출력. useState에 flag추가하여 조건부 렌더링 필요.
            setIsCartitem(false);
          } else {
            // 장바구니 o 상품 o
            // dispatch(orderSliceAction.productInCart([...data[0]?.cartitem]));
            // product 마다 이름 가져오기.
            setProductIdList(
              data[0].cartitem.map((item) => item.productId.toString()),
            );
          }
        },
      },
    },
  );

  const { query: productData } = useGetProductByIdQueries(
    {
      options: {
        enabled: productIdList?.length > 0,
        onSuccess: (data) => {
          console.log('cart data : ', data);
        },
      },
      variables: '',
    },
    productIdList,
  );
  console.log('result queries: ', productData);

  const queryClient = useQueryClient();
  const { mutate: mutatingCount } = usePutProductInCartItemMutation({
    options: {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(CART_API_QUERY_KEY.GET(userData?.id));
      },
    },
  });

  const { mutate: mutatingDelete } = useDeleteCartItemMutation({
    options: {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(CART_API_QUERY_KEY.GET(userData?.id));
      },
    },
  });

  // useEffect(() => {
  // setTotalPrice(
  //   (cartData &&
  //     priceFormat(
  //       cartData[0]?.cartitem
  //         .map((item) => {
  //           const findedProduct = productData.find(
  //             (product: any) => product?.data?.id === item.productId,
  //           );
  //           return Number(findedProduct?.data?.price) * item.count;
  //         })
  //         .reduce(
  //           (previousValue, currentValue) => previousValue + currentValue,
  //           0,
  //         ),
  //     )) ||
  //     '',
  // );
  // }, [cartData, productData]);

  // const [checkItems, setCheckItems] = useState<CartItemDTOType[]>([]);
  const { value: checkItems } = useAppStore((state) => state.ORDER);
  const dispatch = useDispatch();
  // console.log('checkItems ::: ', checkItems);
  // 체크박스 전체 선택
  const handleAllCheck = (checked: boolean) => {
    // console.log('checked : ', checked);
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(id)를 담은 배열로 checkItems 상태 업데이트

      dispatch(orderSliceAction.productInCart([...cartData[0]?.cartitem]));
    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트

      dispatch(orderSliceAction.deleteAllProductInCart());
    }
  };

  const handleDeleteSelected = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    checkItems.forEach((element) => {
      mutatingDelete(String(element?.id));
    });
    dispatch(orderSliceAction.deleteAllProductInCart());
  };

  console.log('userData : ', userData);
  console.log('cartData : ', cartData);

  useEffect(() => {
    const token = getToken();
    if (!token?.access) router.replace('/login');
    else setAuthHeader(token?.access);
  }, [router]);

  useEffect(() => {
    let checkedPrice = 0;
    if (checkItems) {
      checkedPrice = checkItems
        .map((item) => {
          const findedProduct = productData.find(
            (product: any) => product?.data?.id === item.productId,
          );

          return Number(findedProduct?.data?.price) * item.count;
        })
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0,
        );
    }

    setCheckedPrice(checkedPrice);
    if (checkedPrice >= 30000 || checkItems.length === 0) {
      setShippingPrice(0);
    } else {
      setShippingPrice(3000);
    }

    // setCheckedPrice(
    //   (checkItems &&
    //     priceFormat(
    //       checkItems
    //         .map((item) => {
    //           const findedProduct = productData.find(
    //             (product: any) => product?.data?.id === item.productId,
    //           );

    //           return Number(findedProduct?.data?.price) * item.count;
    //         })
    //         .reduce(
    //           (previousValue, currentValue) => previousValue + currentValue,
    //           0,
    //         ),
    //     )) ||
    //     '0',
    // );
  }, [checkItems]);

  useEffect(() => {
    dispatch(orderSliceAction.deleteAllProductInCart());
  }, []);

  return isCartitem ? (
    <Box as="main" {...basisProps} mt={LAYOUT.HEADER.HEIGHT}>
      <VisuallyHidden as="h2">main contents</VisuallyHidden>
      {/* <Skeleton
        isLoaded={
          !productData.some((result: any) => result.isLoading) &&
          !isLoadingCartData
        }
        fadeDuration={1.5}
        startColor="white"
        endColor="white"
      > */}
      <Box>
        <Flex
          justifyContent="space-between"
          color="gray.600"
          alignItems="center"
          py="13px"
          px="16px"
        >
          <Box>
            <Checkbox
              colorScheme="primary"
              w="auto"
              // ref={allCheckBoxRef}
              onChange={(e) => handleAllCheck(e.target.checked)}
              // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
              isChecked={
                checkItems.length === cartData[0]?.cartitem?.length
                  ? true
                  : false
              }
            >
              모두선택
            </Checkbox>
          </Box>
          <Box>
            <Box as="button" onClick={handleDeleteSelected}>
              선택삭제
            </Box>
          </Box>
        </Flex>

        <Box>
          <VisuallyHidden as="h3">장바구니 상품목록</VisuallyHidden>

          {!productData.some((result: any) => result.isLoading) &&
          !isLoadingCartData ? (
            <Box as="ul">
              {cartData &&
                cartData[0]?.cartitem.map((item) => {
                  const findedProduct = productData.find(
                    (product: any) => product?.data?.id === item.productId,
                  );
                  // console.log('findedProduct : ', findedProduct);
                  return (
                    <>
                      <CartItem
                        key={item.id}
                        productData={findedProduct?.data}
                        cartData={item}
                        mutatingCount={mutatingCount}
                        mutatingDelete={mutatingDelete}
                        checkUseState={[
                          checkItems as CartItemDTOType[],
                          dispatch,
                        ]}
                        isLoadingProductData={productData.some(
                          (result: any) => result.isLoading,
                        )}
                      />
                    </>
                  );
                })}
            </Box>
          ) : null}
        </Box>
      </Box>

      <Box px="16px" pt="20px" pb="30px" mt="10px">
        <VisuallyHidden as="h3">금액 정보</VisuallyHidden>
        <Flex
          flexDirection="column"
          pb="20px"
          borderBottom="1px solid"
          borderColor="gray.200"
          gap="10px"
        >
          <Flex justifyContent="space-between" color="gray.600">
            <Box>총 상품금액</Box>
            {/* <Box textAlign="right">{totalPrice}&nbsp;원</Box> */}
            <Box textAlign="right">{priceFormat(checkedPrice)}&nbsp;원</Box>
          </Flex>
          <Flex justifyContent="space-between" color="gray.600">
            <Box>총 배송비</Box>
            <Box textAlign="right">{priceFormat(shippingPrice)}&nbsp;원</Box>
          </Flex>
        </Flex>
        <Box>
          <Flex justifyContent="space-between" pt="20px">
            <Box>결제금액</Box>
            <Box as="strong" textAlign="right" color="primary.500">
              {/* {totalPrice}&nbsp;원 */}
              {priceFormat(checkedPrice + shippingPrice)}&nbsp;원
            </Box>
          </Flex>
        </Box>
        <Box>
          <NextLink href="/order" passHref>
            <Link>
              <Button
                mt="20px"
                fontWeight="700"
                w="100%"
                h="50px"
                borderRadius="25px"
                variant="solid"
                colorScheme="primary"
                fontSize="1rem"
                disabled={checkItems.length === 0 ? true : false}
              >
                결제하기
              </Button>
            </Link>
          </NextLink>
        </Box>
      </Box>
      {/* </Skeleton> */}
    </Box>
  ) : (
    <Box>
      <Flex
        justifyContent="center"
        alignItems="center"
        mt={LAYOUT.HEADER.HEIGHT}
        w="100%"
        minH={`calc(100vh - ${LAYOUT.HEADER.HEIGHT} - ${LAYOUT.FOOTER.HEIGHT})`}
      >
        <Flex
          gap="30px"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box fontWeight="700" fontSize="1rem">
            <Box as="p" w="100%" textAlign="center">
              장바구니가 비어있습니다.
            </Box>
            <Box as="p" w="100%" textAlign="center">
              상품을 추가해보세요!
            </Box>
          </Box>
          <Box>
            <NextLink href="/products" passHref>
              <Link>
                <Button
                  mt="20px"
                  fontWeight="700"
                  w="100%"
                  h="50px"
                  borderRadius="25px"
                  variant="solid"
                  colorScheme="primary"
                  fontSize="1rem"
                  px="45.5px"
                >
                  상품보러가기
                </Button>
              </Link>
            </NextLink>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default CartPage;

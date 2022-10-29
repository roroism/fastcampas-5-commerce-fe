import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ChakraProps,
  Flex,
  Link,
  Skeleton,
  Spinner,
  Text,
  UnorderedList,
  VisuallyHidden,
} from '@chakra-ui/react';

import productApi from '@apis/reactquery/QueryApi';
import {
  useGetMyInfoQuery,
  useGetOrderByOrderIdQueries,
  useGetOrderByOrderIdQuery,
  useGetOrderQuery,
  useGetOrderStatusInfiniteQuery,
  useGetOrderStatusQuery,
  useGetProductByIdQueries,
  useGetProductByIdQueries2,
  useGetProductByIdQueries3,
} from '@apis/reactquery/QueryApi.query';
import {
  GetOrderStatusDTOType,
  OrderByOrderIdDTOType,
  OrderStatusDTOType,
  PaymentStatus,
  ProductDetailDTOType,
  ShippingStatus,
} from '@apis/reactquery/QueryApi.type';
import { orderSliceAction } from '@features/order/orderSlice';
import useAppStore from '@features/useAppStore';

import OrderItem from '@components/OrderPage/_fragments/OrderItem';

import { LAYOUT } from '@constants/layout';

export interface IorderHistoryProduct {
  id: number; // product id
  orderId: string;
  productId: number;
  count: number;
  shippingStatus: ShippingStatus;
  created: string;
  name: string;
  capacity: number;
  price: number;
  photo: string;
  shippingPrice: number;
  status: PaymentStatus;
}

export type GetOrderStatusSelectType = {
  count: number;
  next: string;
  previous: string;
  results: Array<Array<OrderStatusDTOType>>;
  productIdList?: { productId: string; id: string; orderId: string }[];
};

export const PAGE_SIZE = 5;
export const PAGE_NUMBER_SIZE = 5;

interface OrderHistoryPageProps extends ChakraProps {}

function OrderHistoryPage({ ...basisProps }: OrderHistoryPageProps) {
  const {
    query: { page: queryPage = 1 },
  } = useRouter();
  const { data: userData } = useGetMyInfoQuery();
  // const [productIdList, setProductIdList] =
  //   useState<{ productId: string; id: string }[]>();
  // const [orderList, setOrderList] = useState<GetOrderStatusDTOType>();
  const [isRendeing, setIsRendeing] = useState<boolean>(false);
  const [isNextApi, setIsNextApi] = useState<boolean>(false);
  // const { data: orderList } = useGetOrderQuery({
  //   // [0]
  //   variables: userData?.id?.toString(),
  // });
  console.log('query?.page : ', queryPage);
  const {
    data: orderStatusList,
    isLoading: isLoadingOrderStatus,
    // error,
    // fetchNextPage,
    // fetchPreviousPage,
    // hasNextPage,
    // hasPreviousPage,
    // isFetching,
    // isFetchingNextPage,
    // isFetchingPreviousPage,
    // status,
  } = useGetOrderStatusQuery(
    {
      variables: userData?.id?.toString() as string,
      // variables: '4',
      options: {
        enabled: !!queryPage && !!userData?.id?.toString(),
        // onSuccess: (data) => {
        //   console.log('onSuccess data :: ', data);
        //   setOrderList(data.results);
        //   // setProductIdList(data.results.map((item) => item.productId.toString()));
        // },
        onSuccess: (data) => {
          // setOrderList(data);
          setIsNextApi(true);
        },
        select: (data) => {
          const productIdArray = data?.results?.map((item) => ({
            productId: item?.productId?.toString(),
            id: item?.id?.toString(),
            orderId: item?.orderId,
          }));
          // console.log('productIdArray : ', productIdArray);
          // setProductIdList(productIdArray);
          // console.log('select : ', data);
          const newresults = data.results.map((item, idx) => ({
            ...item,
            created: item?.created?.split('T')[0],
          }));
          const newresults2: any = [];
          let newresults2Idx = 0;
          newresults.forEach((item, idx) => {
            if (idx === 0) {
              newresults2.push([item]);
            } else if (item.created === newresults[idx - 1].created) {
              newresults2[newresults2Idx].push(item);
            } else {
              newresults2Idx += 1;
              newresults2.push([item]);
            }
          });

          const newData = {
            ...data,
            productIdList: productIdArray,
          };
          newData.results = newresults2;
          console.log('newData :: ', newData);
          return newData;

          // const newData = { ...data };
          // newData.results = newresults;
          // console.log('newData :: ', newData);
          // return newData;
        },
        // getPreviousPageParam: (firstPage, allPages) => {
        //   console.log('firstPage.cursor : ', firstPage.previous);
        //   return firstPage.previous;
        // },
        // getNextPageParam: (lastPage, allPages) => {
        //   console.log('lastPage.cursor : ', lastPage.next);
        //   return lastPage.next;
        // },
      },
    },
    queryPage as string | undefined,
  );
  // console.log('orderList :: ', orderList);
  const { query: productData } = useGetProductByIdQueries3(
    {
      // options: { enabled: !!productIdList },
      options: {
        // enabled: !isLoadingOrderStatus,
        // enabled: !!orderStatusList && !isLoadingOrderStatus,
        enabled: !!orderStatusList && isNextApi,
        onSuccess: (data: any) => {
          console.log('productData :: ', data);
        },
        // suspense: true,
        // select: (data: any) => {
        //   console.log('cart data : ', data);

        //   const targetIndex = orderStatusList?.results.findIndex(
        //     (item) => item.productId === data.id,
        //   );
        //   const oldOrder = orderStatusList?.results[targetIndex as number];
        //   const newOrder = {
        //     ...oldOrder,
        //     name: data.name,
        //     capacity: data.capacity,
        //     price: data.price,
        //     photo: data.photo,
        //   };
        //   console.log('newOrder :: ', newOrder);
        //   return newOrder;
        //   // setOrderList((prev) => [
        //   //   ...prev.slice(0, targetIndex),
        //   //   newOrder,
        //   //   ...prev.slice(targetIndex + 1),
        //   // ]);
        // },
      },
      variables: '',
    },
    orderStatusList?.productIdList?.map((item) => {
      // console.log('item query : ', item);
      return {
        productId: item?.productId?.toString(),
        id: item?.id?.toString(),
      };
    }),
    // orderStatusList?.results?.map((item) => ({
    //   productId: item?.productId?.toString(),
    //   id: item?.id?.toString(),
    // })),
    // orderList?.map((item) => item?.productId?.toString()),
  );

  const { query: orderData } = useGetOrderByOrderIdQueries(
    {
      options: {
        enabled: !!orderStatusList && isNextApi,
        onSuccess(data) {
          console.log('orderData : ', data);
        },
      },
      variables: '',
    },
    orderStatusList?.productIdList?.map((item) => item.orderId),
  );

  // useEffect(() => {
  //   if (!productData.some((result: any) => result.isLoading))
  //     if (!orderData.some((result: any) => result.isLoading)) {
  //       console.log('useEffect productData : ', productData);
  //       console.log('useEffect OrderData : ', orderData);

  //       const newOrderList = orderStatusList?.results?.map((item) => {
  //         const targetProduct = productData
  //           .map((item: any) => item.data)
  //           .find(
  //             (product: ProductDetailDTOType) => product.id === item.productId,
  //           );

  //         const targetOrder = orderData
  //           .map((item: any) => item.data)
  //           .find((order: OrderByOrderIdDTOType) => order.id === item.orderId);

  //         console.log('targetProduct : ', targetProduct);
  //         const newOrder = {
  //           ...item,
  //           name: targetProduct.name,
  //           capacity: targetProduct.capacity,
  //           price: targetProduct.price,
  //           photo: targetProduct.photo,
  //           status: targetOrder.status,
  //           shippingPrice: targetOrder.shippingPrice,
  //         };
  //         return newOrder;
  //       });
  //       console.log('newOrderList : ', newOrderList);
  //       // setOrderList(newOrderList as IorderHistoryProduct[]);
  //       dispatch(orderSliceAction.addOrderHistoyList(newOrderList));
  //       // setIsRendeing(true);
  //     }
  //   console.log('useEffect neworderList : ', orderList);
  // }, [productData, orderData]);

  // const { data: shippingPriceData } = useGetOrderByOrderIdQuery();
  // console.log('1 neworderList : ', orderList);
  // console.log('2 productData : ', productData);
  // console.log('3 orderData : ', orderData);
  // console.log('neworderList2 : ', orderList2);

  console.log('productData : ', productData);
  console.log('orderData : ', orderData);

  const pageNumberRendering = () => {
    const result = [];

    const countAll = orderStatusList?.count || PAGE_SIZE;

    if (orderStatusList?.previous) {
      result.push(
        <div key="prevarrow">
          <NextLink
            href={
              orderStatusList?.previous
                ? `/mypage/history/${Number(queryPage) - 1}`
                : ''
            }
            scroll={false}
            passHref
          >
            <Link>
              <Text>&lt;</Text>
            </Link>
          </NextLink>
        </div>,
      );
    } else {
      result.push(<div key="prevarrow" style={{ width: '9px' }}></div>);
    }
    console.log('queryPage : ', queryPage);

    const lastPageNumber = Math.ceil(countAll / PAGE_SIZE);
    const beginPageNumber: number =
      Math.floor((Number(queryPage) - 1) / PAGE_NUMBER_SIZE) * PAGE_NUMBER_SIZE;
    let endPageNumber: number;
    if (
      beginPageNumber <= lastPageNumber &&
      lastPageNumber < beginPageNumber + 5
    ) {
      endPageNumber = lastPageNumber;
    } else {
      endPageNumber = beginPageNumber + 5;
    }

    // for (let i = 0; i < Math.ceil(countAll / PAGE_SIZE); i++) {
    for (let i = beginPageNumber; i < endPageNumber; i++) {
      result.push(
        <div key={i + 1}>
          <NextLink href={`/mypage/history/${i + 1}`} scroll={false} passHref>
            <Link>
              <Text fontWeight={Number(queryPage) === i + 1 ? '700' : '400'}>
                {i + 1}
              </Text>
            </Link>
          </NextLink>
        </div>,
      );
    }

    if (orderStatusList?.next) {
      result.push(
        <div key="nextarrow">
          <NextLink
            href={
              orderStatusList?.next
                ? `/mypage/history/${Number(queryPage) + 1}`
                : ''
            }
            scroll={false}
            passHref
          >
            <Link>
              <Text>&gt;</Text>
            </Link>
          </NextLink>
        </div>,
      );
    } else {
      result.push(<div key="nextarrow" style={{ width: '9px' }}></div>);
    }

    return result;
  };

  const orderListRender = () => {
    const orderRenderList: unknown = { ...orderStatusList };
    const orderRenderList2 = orderRenderList as GetOrderStatusSelectType;
    const result: any = [];

    orderRenderList2?.results?.forEach((item, idx) => {
      result.push(
        <Box
          py="18px"
          borderTop="1px solid"
          borderColor="gray.100"
          key={`${idx}-created`}
        >
          <Text as="h4" fontWeight="700" fontSize="12px">
            [{item[0]?.created}]
          </Text>
        </Box>,
      );
      // result.push(
      // <UnorderedList
      //   key={`${item[idx]?.id}-ul`}
      //   styleType="none"
      //   p={0}
      //   m={0}
      //   mt="11px"
      //   display="flex"
      //   flexDirection="column"
      //   gap="10px"
      // >);

      const orderitem = item.map((item2) => {
        const product = productData.find(
          ({ data }: any) => data.id === item2.productId,
        );
        const shippingPriceInfo: any = orderData.find(
          ({ data }: any) => data.id === item2.orderId,
        );

        const newInfo = {
          ...item2,
          name: product.data.name,
          capacity: product.data.capacity,
          price: product.data.price,
          photo: product.data.photo,
          shippingPrice: shippingPriceInfo?.data?.shippingPrice,
        };

        return (
          <Box key={`${item2?.id}orderitem`}>
            <OrderItem
              htmlTag={'div'}
              product={newInfo}
              // paymentStatus={shippingPriceInfo.status}
              shippingStatus={item2.shippingStatus}
            />
          </Box>
        );
      });
      result.push(orderitem);
      // result.push(</UnorderedList>);
    });

    return result;
  };

  useEffect(() => {
    console.log('orderStatusList :: ', orderStatusList);
  }, [orderStatusList]);

  return (
    <Box mt={LAYOUT.HEADER.HEIGHT} {...basisProps} minH="100vh">
      <VisuallyHidden as="h2">main contents</VisuallyHidden>
      <Text as="h3" fontWeight="700" fontSize="1.25rem" px="16px">
        주문내역
      </Text>
      {!productData.some((result: any) => result.isLoading) &&
      !orderData.some((result: any) => result.isLoading) ? (
        <>
          <Box bgColor="white" px="16px" minH="53vh">
            <Box mt="80px">
              {!productData.some((result: any) => result.isLoading) &&
                !orderData.some((result: any) => result.isLoading) &&
                orderListRender()}
            </Box>
          </Box>
          <Flex gap="30px" justifyContent="center" my="50px">
            {!isLoadingOrderStatus && pageNumberRendering()}
          </Flex>
        </>
      ) : (
        <Flex
          w="full"
          minH="100vh"
          h="full"
          justify="center"
          alignItems="center"
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.500"
            size="xl"
          />
        </Flex>
      )}
    </Box>
  );
}

export default OrderHistoryPage;

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

// export const PAGE_SIZE = 5;
export const PAGE_SIZE_LIMIT = 5;
export const PAGE_NUMBER_SIZE = 5;

interface OrderHistory2PageProps extends ChakraProps {}

function OrderHistory2Page({ ...basisProps }: OrderHistory2PageProps) {
  const {
    query: { page: queryPage = 1 },
  } = useRouter();
  const { data: userData } = useGetMyInfoQuery();
  const [isNextApi, setIsNextApi] = useState<boolean>(false);
  console.log('query?.page : ', queryPage);

  const { data: orderListData, isLoading: isLoadingOrder } = useGetOrderQuery({
    options: {
      enabled: !!queryPage && !!userData?.id?.toString(),
      select: (data) => {
        console.log('select results : ', data);

        const newresults = data.results.map((item) => ({
          ...item,
          created: item?.created?.toString().split('T')[0],
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
          results: newresults2,
        };
        console.log('newData :: ', newData);
        return newData;
      },
    },
    variables: {
      userId: userData?.id?.toString() as string,
      offset: ((Number(queryPage) - 1) * 2) as number,
    },
  });

  // const {
  //   data: orderStatusList,
  //   isLoading: isLoadingOrderStatus,
  //   // error,
  //   // fetchNextPage,
  //   // fetchPreviousPage,
  //   // hasNextPage,
  //   // hasPreviousPage,
  //   // isFetching,
  //   // isFetchingNextPage,
  //   // isFetchingPreviousPage,
  //   // status,
  // } = useGetOrderStatusQuery(
  //   {
  //     variables: userData?.id?.toString() as string,
  //     // variables: '4',
  //     options: {
  //       enabled: !!queryPage && !!userData?.id?.toString(),
  //       // onSuccess: (data) => {
  //       //   console.log('onSuccess data :: ', data);
  //       //   setOrderList(data.results);
  //       //   // setProductIdList(data.results.map((item) => item.productId.toString()));
  //       // },
  //       onSuccess: (data) => {
  //         // setOrderList(data);
  //         setIsNextApi(true);
  //       },
  //       select: (data) => {
  //         const productIdArray = data?.results?.map((item) => ({
  //           productId: item?.productId?.toString(),
  //           id: item?.id?.toString(),
  //           orderId: item?.orderId,
  //         }));

  //         const newresults = data.results.map((item, idx) => ({
  //           ...item,
  //           created: item?.created?.split('T')[0],
  //         }));
  //         const newresults2: any = [];
  //         let newresults2Idx = 0;
  //         newresults.forEach((item, idx) => {
  //           if (idx === 0) {
  //             newresults2.push([item]);
  //           } else if (item.created === newresults[idx - 1].created) {
  //             newresults2[newresults2Idx].push(item);
  //           } else {
  //             newresults2Idx += 1;
  //             newresults2.push([item]);
  //           }
  //         });

  //         const newData = {
  //           ...data,
  //           productIdList: productIdArray,
  //         };
  //         newData.results = newresults2;
  //         console.log('newData :: ', newData);
  //         return newData;
  //       },
  //     },
  //   },
  //   queryPage as string | undefined,
  // );

  // const { query: productData } = useGetProductByIdQueries3(
  //   {
  //     // options: { enabled: !!productIdList },
  //     options: {
  //       // enabled: !isLoadingOrderStatus,
  //       // enabled: !!orderStatusList && !isLoadingOrderStatus,
  //       enabled: !!orderStatusList && isNextApi,
  //       onSuccess: (data: any) => {
  //         console.log('productData :: ', data);
  //       },
  //     },
  //     variables: '',
  //   },
  //   orderStatusList?.productIdList?.map((item) => {
  //     // console.log('item query : ', item);
  //     return {
  //       productId: item?.productId?.toString(),
  //       id: item?.id?.toString(),
  //     };
  //   }),
  // );

  // const { query: orderData } = useGetOrderByOrderIdQueries(
  //   {
  //     options: {
  //       enabled: !!orderStatusList && isNextApi,
  //       onSuccess(data) {
  //         console.log('orderData : ', data);
  //       },
  //     },
  //     variables: '',
  //   },
  //   orderStatusList?.productIdList?.map((item) => item.orderId),
  // );

  // console.log('productData : ', productData);
  console.log('orderListData : ', orderListData);

  const pageNumberRendering = () => {
    const result = [];

    const countAll = orderListData?.count || PAGE_SIZE_LIMIT;

    if (queryPage > 1) {
      result.push(
        <div key="prevarrow">
          <NextLink
            href={
              queryPage > 1 ? `/mypage/history/${Number(queryPage) - 1}` : ''
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

    const lastPageNumber = Math.ceil(countAll / PAGE_SIZE_LIMIT);
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

    if (!orderListData?.isNext) {
      result.push(
        <div key="nextarrow">
          <NextLink
            href={
              !orderListData?.isNext
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

  // const orderListRender = () => {
  //   const orderRenderList: unknown = { ...orderStatusList };
  //   const orderRenderList2 = orderRenderList as GetOrderStatusSelectType;
  //   const result: any = [];

  //   orderRenderList2?.results?.forEach((item, idx) => {
  //     result.push(
  //       <Box
  //         py="18px"
  //         borderTop="1px solid"
  //         borderColor="gray.100"
  //         key={`${idx}-created`}
  //       >
  //         <Text as="h4" fontWeight="700" fontSize="12px">
  //           [{item[0]?.created}]
  //         </Text>
  //       </Box>,
  //     );
  //     // result.push(
  //     // <UnorderedList
  //     //   key={`${item[idx]?.id}-ul`}
  //     //   styleType="none"
  //     //   p={0}
  //     //   m={0}
  //     //   mt="11px"
  //     //   display="flex"
  //     //   flexDirection="column"
  //     //   gap="10px"
  //     // >);

  //     const orderitem = item.map((item2) => {
  //       const product = productData.find(
  //         ({ data }: any) => data.id === item2.productId,
  //       );
  //       const shippingPriceInfo: any = orderData.find(
  //         ({ data }: any) => data.id === item2.orderId,
  //       );

  //       const newInfo = {
  //         ...item2,
  //         name: product.data.name,
  //         capacity: product.data.capacity,
  //         price: product.data.price,
  //         photo: product.data.photo,
  //         shippingPrice: shippingPriceInfo?.data?.shippingPrice,
  //       };

  //       return (
  //         <Box key={`${item2?.id}orderitem`}>
  //           <OrderItem
  //             htmlTag={'div'}
  //             product={newInfo}
  //             // paymentStatus={shippingPriceInfo.status}
  //             shippingStatus={item2.shippingStatus}
  //           />
  //         </Box>
  //       );
  //     });
  //     result.push(orderitem);
  //     // result.push(</UnorderedList>);
  //   });

  //   return result;
  // };

  return (
    <Box mt={LAYOUT.HEADER.HEIGHT} {...basisProps} minH="100vh">
      <VisuallyHidden as="h2">main contents</VisuallyHidden>
      <Text as="h3" fontWeight="700" fontSize="1.25rem" px="16px">
        주문내역
      </Text>
      {!isLoadingOrder ? (
        <>
          <Box bgColor="white" px="16px" minH="53vh">
            <Box mt="80px">
              {/* {!productData.some((result: any) => result.isLoading) &&
                !orderData.some((result: any) => result.isLoading) &&
                orderListRender()} */}
            </Box>
          </Box>
          <Flex gap="30px" justifyContent="center" my="50px">
            {!isLoadingOrder && pageNumberRendering()}
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

export default OrderHistory2Page;

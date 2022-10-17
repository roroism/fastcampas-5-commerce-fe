import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  ChakraProps,
  Text,
  UnorderedList,
  VisuallyHidden,
} from '@chakra-ui/react';

import productApi from '@apis/reactquery/QueryApi';
import {
  useGetMyInfoQuery,
  useGetOrderByOrderIdQuery,
  useGetOrderQuery,
  useGetOrderStatusQuery,
  useGetProductByIdQueries,
  useGetProductByIdQueries2,
} from '@apis/reactquery/QueryApi.query';
import {
  OrderStatusDTOType,
  ShippingStatus,
} from '@apis/reactquery/QueryApi.type';

import OrderItem from '@components/OrderPage/_fragments/OrderItem';

import { LAYOUT } from '@constants/layout';

import PaginationPage from './PaginationPage';

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

interface OrderHistoryPageProps extends ChakraProps {}

function OrderHistoryPage({ ...basisProps }: OrderHistoryPageProps) {
  const { data: userData } = useGetMyInfoQuery();
  const [orderList, setOrderList] = useState<IorderHistoryProduct[]>([]);
  const [orderList2, setOrderList2] = useState<IorderHistoryProduct[]>([]);
  // const { data: orderList } = useGetOrderQuery({
  //   // [0]
  //   variables: userData?.id?.toString(),
  // });
  const { data: orderStatusList, isLoading: isLoadingOrderStatus } =
    useGetOrderStatusQuery({
      // variables: userData?.id?.toString() as string,
      variables: '4',
      options: {
        onSuccess: ({ pageParams, pages }) => {
          console.log('onSuccess pages :: ', pages);
          setOrderList(pages[0].results);
          // setProductIdList(data.results.map((item) => item.productId.toString()));
        },
        getPreviousPageParam: (firstPage, allPages) => {
          console.log('firstPage.cursor : ', firstPage.previous);
          return firstPage.previous;
        },
        getNextPageParam: (lastPage, allPages) => {
          console.log('lastPage.cursor : ', lastPage.next);
          return lastPage.next;
        },
      },
    });

  const { query: productData } = useGetProductByIdQueries2(
    {
      // options: { enabled: !!productIdList },
      options: {
        enabled: !isLoadingOrderStatus,
        // suspense: true,
        onSuccess: (data) => {
          console.log('cart data : ', data);

          const targetIndex = orderList.findIndex(
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

  useEffect(() => {
    console.log('useEffect productData : ', productData);

    // const neworderList = orderList?.forEach((orderitem, idx) => {
    //   let shippingPrice;
    //   productApi.getOrderByOrderId(orderitem.orderId).then((res) => {
    //     // console.log('shippingPrice : ', res.shippingPrice);
    //     shippingPrice = res.shippingPrice;
    //     if (orderitem.productId === data.id) {
    //       orderitem = {
    //         ...orderitem,
    //         name: data.name,
    //         capacity: data.capacity,
    //         price: data.price,
    //         photo: data.photo,
    //         shippingPrice: shippingPrice,
    //       };
    //     }

    //     setorderList((prev) => {
    //       if (prev) {
    //         const newList = [...prev];
    //         newList[idx] = orderitem;
    //         return newList;
    //       }
    //     });
    //   });

    //   // return orderitem;
    // });
  }, [productData]);

  // const { data: shippingPriceData } = useGetOrderByOrderIdQuery();
  console.log('neworderList : ', orderList);
  console.log('neworderList2 : ', orderList2);
  return (
    <Box mt={LAYOUT.HEADER.HEIGHT} {...basisProps}>
      <VisuallyHidden as="h2">main contents</VisuallyHidden>
      <Box bgColor="white" px="16px">
        <Text as="h3" fontWeight="700" fontSize="1.25rem">
          주문내역
        </Text>

        <Box mt="80px">
          <Text fontWeight="700" fontSize="12px">
            [2021-04-01]
            {/* {paymentByOrderIdData?.created} */}
            {/* store.newsList[i].pub_date.replace("T", " ").split("+")[0]; */}
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
            {/* {orderList.map((product, idx) => (
              <OrderItem
                key={idx}
                product={product}
                paymentStatus={paymentByOrderIdData?.status}
              />
            ))} */}
          </UnorderedList>
        </Box>
      </Box>
      <PaginationPage></PaginationPage>
    </Box>
  );
}

export default OrderHistoryPage;

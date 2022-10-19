import {
  As,
  Box,
  ChakraProps,
  Flex,
  Image,
  Skeleton,
  Text,
} from '@chakra-ui/react';

import { PaymentStatus, ShippingStatus } from '@apis/reactquery/QueryApi.type';
import { IpaymentListInOrderStateType } from '@features/order/orderSlice';

import { PaymentProductType } from '../types';

import priceFormat from 'hooks/priceFormat';

interface IOrderItem {
  id: number | null; // cartitem id
  productId: number;
  cartId?: number;
  count: number;
  name?: string;
  capacity?: number;
  price?: number;
  shippingStatus?: ShippingStatus;
  orderId?: string;
  created?: string;
  photo?: string;
  shippingPrice?: number;
}

interface OrderItemProps extends ChakraProps {
  product: IOrderItem;
  paymentCompleted?: boolean;
  paymentStatus?: PaymentStatus;
  shippingStatus?: ShippingStatus;
  htmlTag?: As<any> | undefined;
}

const OrderItem = ({
  product,
  paymentStatus,
  shippingStatus,
  htmlTag = 'li',
  ...basisProps
}: OrderItemProps) => {
  // console.log('OrderItem product : ', product);
  return (
    <Box
      as={htmlTag}
      {...basisProps}
      borderTop="1px solid"
      borderColor="gray.200"
      py="10px"
    >
      <Flex gap="10px" justifyContent="space-between">
        <Flex
          justifyContent="center"
          alignItems="center"
          w="60px"
          h="60px"
          backgroundColor="gray.100"
          color="transparent"
          borderRadius="5px"
        >
          <Image w="100%" src={product.photo} alt={`${product.name} 이미지`} />
        </Flex>

        <Flex
          flexDirection="column"
          fontSize="0.75rem"
          flexGrow="1"
          justifyContent="center"
        >
          <Box as="strong" fontWeight="700">
            {product.name}
          </Box>
          <Box as="span" color="gray.700">
            {product.name} | {product.capacity}ml
          </Box>
          <Box as="strong" color="primary.500" mt="3px">
            {priceFormat(product.price)}원 / {product.count}개
          </Box>
        </Flex>
        {paymentStatus && (
          <Flex alignItems="center">
            <Text fontWeight="700" fontSize="0.75rem" color="primary.500">
              {paymentStatus === PaymentStatus.DONE ? '결제완료' : '기타사항'}
            </Text>
          </Flex>
        )}
        {shippingStatus && !product?.shippingPrice ? (
          <Flex alignItems="center">
            <Text fontWeight="700" fontSize="0.75rem" color="primary.500">
              {shippingStatus === ShippingStatus.PAID
                ? '결제완료'
                : shippingStatus === ShippingStatus.WAIT
                ? '상품준비'
                : shippingStatus === ShippingStatus.INPROGRESS
                ? '배송중'
                : shippingStatus === ShippingStatus.DONE
                ? '배송완료'
                : shippingStatus === ShippingStatus.CANCELED
                ? '주문취소'
                : '기타사항'}
            </Text>
          </Flex>
        ) : shippingStatus && product.shippingPrice ? (
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text
              fontWeight="700"
              fontSize="0.75rem"
              color="primary.500"
              textAlign="right"
              w="100%"
            >
              {shippingStatus === ShippingStatus.PAID
                ? '결제완료'
                : shippingStatus === ShippingStatus.WAIT
                ? '상품준비'
                : shippingStatus === ShippingStatus.INPROGRESS
                ? '배송중'
                : shippingStatus === ShippingStatus.DONE
                ? '배송완료'
                : shippingStatus === ShippingStatus.CANCELED
                ? '주문취소'
                : '기타사항'}
            </Text>
            <Text fontWeight="400" fontSize="0.75rem">
              {product.shippingPrice === 0
                ? '무료배송'
                : `배송비 ${priceFormat(product.shippingPrice)}원`}
            </Text>
          </Flex>
        ) : null}
      </Flex>
    </Box>
  );
};

export default OrderItem;

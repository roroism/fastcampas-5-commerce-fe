import { Box, ChakraProps, Flex, Image, Text } from '@chakra-ui/react';

import { PaymentProductType } from '../types';

interface OrderItemProps extends ChakraProps {
  product: PaymentProductType;
  paymentCompleted?: boolean;
}

const OrderItem = ({
  product,
  paymentCompleted,
  ...basisProps
}: OrderItemProps) => {
  console.log('OrderItem product : ', product);
  return (
    <Box
      as="li"
      {...basisProps}
      borderTop="1px solid"
      borderColor="gray.200"
      py="10px"
    >
      <Flex gap="10px" justifyContent="space-between">
        <Box w="60px" h="60px" backgroundColor="primary.500">
          <Image w="100%" src={product.photo} alt={`${product.name} 이미지`} />
        </Box>
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
          <Box as="strong" color="primary.500">
            {product.price} / {product.count}
          </Box>
        </Flex>
        {paymentCompleted && (
          <Flex alignItems="center">
            <Text fontWeight="700" fontSize="0.75rem" color="primary.500">
              결제완료
            </Text>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default OrderItem;

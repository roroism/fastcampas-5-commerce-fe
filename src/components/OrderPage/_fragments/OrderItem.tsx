import { Box, ChakraProps, Flex, Image, Text } from '@chakra-ui/react';

interface OrderItemProps extends ChakraProps {
  paymentCompleted?: boolean;
}

const OrderItem = ({ paymentCompleted, ...basisProps }: OrderItemProps) => {
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
          <Image
            w="100
          %"
          />
        </Box>
        <Flex
          flexDirection="column"
          fontSize="0.75rem"
          flexGrow="1"
          justifyContent="center"
        >
          <Box as="strong" fontWeight="700">
            샴푸 & 바디
          </Box>
          <Box as="span" color="gray.700">
            샴푸 & 바디 | 120ml
          </Box>
          <Box as="strong" color="primary.500">
            27,000원 / 1개
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

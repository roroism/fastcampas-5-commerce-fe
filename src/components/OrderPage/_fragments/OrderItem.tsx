import { Box, ChakraProps, Flex, Image } from '@chakra-ui/react';

interface OrderItemProps extends ChakraProps {}

const OrderItem = ({ ...basisProps }: OrderItemProps) => {
  return (
    <Box
      as="li"
      {...basisProps}
      borderBottom="1px solid"
      borderColor="gray.200"
    >
      <Flex gap="10px">
        <Box w="60px" h="60px" backgroundColor="primary.500">
          <Image
            w="100
          %"
          />
        </Box>
        <Flex flexDirection="column" fontSize="0.75rem">
          <Box as="strong">샴푸 & 바디</Box>
          <Box as="span" color="gray.700">
            샴푸 & 바디 | 120ml
          </Box>
          <Box as="strong" color="primary.500">
            27,000원 / 1개
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default OrderItem;

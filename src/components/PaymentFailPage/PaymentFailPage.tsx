import { useRouter } from 'next/router';
import React from 'react';

import { Box, ChakraProps, Flex, Spinner, Text } from '@chakra-ui/react';

interface PaymentFailPageProps extends ChakraProps {}

function PaymentFailPage({ ...basisProps }: PaymentFailPageProps) {
  const router = useRouter();

  // const { orderId, paymentKey, amount } = router.query;

  return (
    <>
      <Box {...basisProps} h="100vh">
        <Flex w="full" h="full" justify="center" alignItems="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="primary.500"
            size="xl"
          />
        </Flex>
      </Box>
    </>
  );
}

export default PaymentFailPage;

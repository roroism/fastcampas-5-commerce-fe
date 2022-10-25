import React from 'react';

import { Box, ChakraProps, Text } from '@chakra-ui/react';

interface MyReviewPageProps extends ChakraProps {}

function MyReviewPage({ ...basisProps }: MyReviewPageProps) {
  return (
    <Box {...basisProps}>
      <Text>MyReviewPage</Text>
    </Box>
  );
}

export default MyReviewPage;

import React from 'react';

import { Box, ChakraProps, Text } from '@chakra-ui/react';

interface TestPageProps extends ChakraProps {}

function TestPage({ ...basisProps }: TestPageProps) {
  return (
    <Box {...basisProps}>
      <Text>TestPage</Text>
    </Box>
  );
}

export default TestPage;

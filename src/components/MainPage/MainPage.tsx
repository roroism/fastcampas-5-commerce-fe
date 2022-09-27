import React from 'react';

import { Box, ChakraProps, Text } from '@chakra-ui/react';

interface MainPageProps extends ChakraProps {}

function MainPage({ ...basisProps }: MainPageProps) {
  return (
    <Box {...basisProps}>
      <Text>MainPage</Text>
    </Box>
  );
}

export default MainPage;

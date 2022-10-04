import React from 'react';

import { Box, ChakraProps, Text } from '@chakra-ui/react';

interface MypagePageProps extends ChakraProps {}

function MypagePage({ ...basisProps }: MypagePageProps) {
  return (
    <Box {...basisProps}>
      <Text>MypagePage</Text>
    </Box>
  );
}

export default MypagePage;

import React from 'react';

import { Box, ChakraProps, Text } from '@chakra-ui/react';

interface KakaoPageProps extends ChakraProps {}

function KakaoPage({ ...basisProps }: KakaoPageProps) {
  return (
    <Box {...basisProps}>
      <Text>KakaoPage</Text>
    </Box>
  );
}

export default KakaoPage;

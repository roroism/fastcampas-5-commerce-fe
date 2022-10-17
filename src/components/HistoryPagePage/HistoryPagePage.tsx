import { useRouter } from 'next/router';
import React from 'react';

import { Box, ChakraProps, Text } from '@chakra-ui/react';

import HistoryPagination from './PaginationPage';

interface HistoryPagePageProps extends ChakraProps {}

function HistoryPagePage({ ...basisProps }: HistoryPagePageProps) {
  const router = useRouter();
  console.log(router.query.page);

  return (
    <Box {...basisProps}>
      <Text>HistoryPagePage</Text>
      <Text>{router.query.page}</Text>
      <HistoryPagination />
    </Box>
  );
}

export default HistoryPagePage;

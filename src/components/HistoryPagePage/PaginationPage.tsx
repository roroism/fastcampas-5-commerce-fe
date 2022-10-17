import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  ChakraProps,
  Text,
} from '@chakra-ui/react';

interface HistoryPaginationProps extends ChakraProps {}

function HistoryPagination({ ...basisProps }: HistoryPaginationProps) {
  const router = useRouter();
  console.log(router.query.page);

  return (
    <Box {...basisProps}>
      <Text>pagination</Text>
      <Text>{router.query.page}</Text>
      <Box>test page</Box>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/mypage/history/1" scroll={false}>
            1
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/mypage/history/2" scroll={false}>
            2
          </BreadcrumbLink>
        </BreadcrumbItem>
        {/* <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Contact</BreadcrumbLink>
        </BreadcrumbItem> */}
      </Breadcrumb>
    </Box>
  );
}

export default HistoryPagination;
